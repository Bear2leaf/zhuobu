import RenderingContext from "../renderingcontext/RenderingContext.js";
import OffscreenCanvas from "./OffscreenCanvas.js";
const INF = 1e20;

class TinySDF {
    private readonly buffer: number;
    private readonly cutoff: number;
    private readonly radius: number;
    private readonly size: number;
    private readonly context: RenderingContext;
    private readonly gridOuter: Float64Array;
    private readonly gridInner: Float64Array;
    private readonly f: Float64Array;
    private readonly z: Float64Array;
    private readonly v: Uint16Array;
    constructor({
        fontSize = 24,
        buffer = 3,
        radius = 8,
        cutoff = 0.25,
        fontFamily = 'sans-serif',
        fontWeight = 'normal',
        fontStyle = 'normal',
    } = {}, context: RenderingContext) {
        this.buffer = buffer;
        this.cutoff = cutoff;
        this.radius = radius;
        this.context = context;

        // make the canvas size big enough to both have the specified buffer around the glyph
        // for "halo", and account for some glyphs possibly being larger than their font size
        const size = this.size = fontSize + buffer * 4;
        context.updateSize(size, size);
        const font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
        const textBaseline = 'alphabetic';
        const textAlign = 'left'; // Necessary so that RTL text doesn't have different alignment
        const fillStyle = 'black';
        context.updateFont(font, textBaseline, textAlign, fillStyle);

        // temporary arrays for the distance transform
        this.gridOuter = new Float64Array(size * size);
        this.gridInner = new Float64Array(size * size);
        this.f = new Float64Array(size);
        this.z = new Float64Array(size + 1);
        this.v = new Uint16Array(size);
    }

    isASCII(str: string) {
        return /^[\x00-\x7F]*$/.test(str);
    }
    draw(char: string) {
        const {
            width: glyphAdvance,
            actualBoundingBoxAscent,
            actualBoundingBoxDescent
        } = this.context.measureText(char);

        // The integer/pixel part of the top alignment is encoded in metrics.glyphTop
        // The remainder is implicitly encoded in the rasterization
        const glyphTop = Math.ceil(actualBoundingBoxAscent);
        const glyphLeft = 0;

        // If the glyph overflows the canvas size, it will be clipped at the bottom/right
        const glyphWidth = Math.max(0, Math.min(this.size - this.buffer, glyphAdvance));
        const glyphHeight = Math.min(this.size - this.buffer, glyphTop + Math.ceil(actualBoundingBoxDescent));

        const width = glyphWidth + 2 * this.buffer;
        const height = glyphHeight + 2 * this.buffer;
        console.log(this.context.measureText(char))

        const len = Math.max(width * height, 0);
        const data = new Uint8ClampedArray(len);
        const glyph = { data, width, height, glyphWidth, glyphHeight, glyphTop, glyphLeft, glyphAdvance };
        if (glyphWidth === 0 || glyphHeight === 0) return glyph;

        const { context, buffer, gridInner, gridOuter } = this;
        context.clearRect(buffer, buffer, glyphWidth, glyphHeight);
        context.fillText(char, buffer, buffer + glyphTop);
        const imgData = context.getImageData(buffer, buffer, glyphWidth, glyphHeight) as ImageData;

        // Initialize grids outside the glyph range to alpha 0
        gridOuter.fill(INF, 0, len);
        gridInner.fill(0, 0, len);

        for (let y = 0; y < glyphHeight; y++) {
            for (let x = 0; x < glyphWidth; x++) {
                const a = imgData.data[4 * (y * glyphWidth + x) + 3] / 255; // alpha value
                if (a === 0) continue; // empty pixels

                const j = (y + buffer) * width + x + buffer;

                if (a === 1) { // fully drawn pixels
                    gridOuter[j] = 0;
                    gridInner[j] = INF;

                } else { // aliased pixels
                    const d = 0.5 - a;
                    gridOuter[j] = d > 0 ? d * d : 0;
                    gridInner[j] = d < 0 ? d * d : 0;
                }
            }
        }

        edt(gridOuter, 0, 0, width, height, width, this.f, this.v, this.z);
        edt(gridInner, buffer, buffer, glyphWidth, glyphHeight, width, this.f, this.v, this.z);

        for (let i = 0; i < len; i++) {
            const d = Math.sqrt(gridOuter[i]) - Math.sqrt(gridInner[i]);
            data[i] = Math.round(255 - 255 * (d / this.radius + this.cutoff));
        }

        return glyph;
    }
}

// 2D Euclidean squared distance transform by Felzenszwalb & Huttenlocher https://cs.brown.edu/~pff/papers/dt-final.pdf
function edt(data: Float64Array, x0: number, y0: number, width: number, height: number, gridSize: number, f: Float64Array, v: Uint16Array, z: Float64Array) {
    for (let x = x0; x < x0 + width; x++) edt1d(data, y0 * gridSize + x, gridSize, height, f, v, z);
    for (let y = y0; y < y0 + height; y++) edt1d(data, y * gridSize + x0, 1, width, f, v, z);
}

// 1D squared distance transform
function edt1d(grid: { [x: string]: any; }, offset: number, stride: number, length: number, f: Float64Array, v: Uint16Array, z: Float64Array) {
    v[0] = 0;
    z[0] = -INF;
    z[1] = INF;
    f[0] = grid[offset];

    for (let q = 1, k = 0, s = 0; q < length; q++) {
        f[q] = grid[offset + q * stride];
        const q2 = q * q;
        do {
            const r = v[k];
            s = (f[q] - f[r] + q2 - r * r) / (q - r) / 2;
        } while (s <= z[k] && --k > -1);

        k++;
        v[k] = q;
        z[k] = s;
        z[k + 1] = INF;
    }

    for (let q = 0, k = 0; q < length; q++) {
        while (z[k + 1] < q) k++;
        const r = v[k];
        const qr = q - r;
        grid[offset + q * stride] = f[r] + qr * qr;
    }
}

export default class SDFCanvas implements OffscreenCanvas {
    private context?: RenderingContext;
    private tinySDF?: TinySDF;
    setContext(context: RenderingContext): void {
        this.context = context;
        const fontSize = 24;
        const fontWeight = "400";
        const buffer = Math.ceil(fontSize / 8);
        const radius = Math.ceil(fontSize / 3);

        this.tinySDF = new TinySDF({ fontSize, buffer, radius, fontWeight }, context);
        const chars = '和'
        const { data, width, height } = this.getTinySDF().draw(chars);
        context.putImageData(this.makeRGBAImageData(data, width, height), 0, 0);
    }

    // Convert alpha-only to RGBA so we can use `putImageData` for building the composite bitmap
    makeRGBAImageData(alphaChannel: Uint8ClampedArray, width: number, height: number) {
        const imageData = this.getContext().createImageData(width, height);
        for (let i = 0; i < alphaChannel.length; i++) {
            imageData.data[4 * i + 0] = alphaChannel[i];
            imageData.data[4 * i + 1] = alphaChannel[i];
            imageData.data[4 * i + 2] = alphaChannel[i];
            imageData.data[4 * i + 3] = 255;
        }
        return imageData;
    }

    getTinySDF() {
        if (this.tinySDF === undefined) {
            throw new Error("tinySDF is undefined");
        }
        return this.tinySDF;
    }
    getContext() {
        if (this.context === undefined) {
            throw new Error("context is undefined");
        }
        return this.context;
    }
    readOnePixel(x: number, y: number) {
        this.getContext().readSinglePixel(x, y)
    }
    fillWithColor(r: number, g: number, b: number) {
        // const context = this.getContext();
        // context.clear(r, g, b);
    }
    clearRect(x: number, y: number, width: number, height: number) {
        // const context = this.getContext();
        // context.clearRect(x, y, width, height);
    }
    fillWithText(text: string) {
    }

}