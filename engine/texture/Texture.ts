import Device from "../device/Device.js";

export default class Texture {
    private texture: WebGLTexture | null = null;
    private image: HTMLImageElement | null = null;
    private readonly width: number;
    private readonly height: number;
    readonly unit: number;
    readonly name: string;
    readonly program: string;
    readonly load: boolean;
    constructor(name: string, unit: number, program: string, width: number, height: number, load: boolean) {
        this.name = name;
        this.program = program;
        this.unit = unit;
        this.width = width;
        this.height = height;
        this.load = load;
    }
    static create(name: string, unit: number, program: string, width: number, height: number, load: boolean = false) {
        return new Texture(name, unit, program, width, height, load);
    }
    async loadImage(device: Device) {
        if (this.load) {
            const image = device.createImage();
            image.src = `resource/image/${this.name}.png`;
            this.image = image;
            await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = reject; });
        }
    }
    attachToFramebuffer(context: WebGL2RenderingContext, attachment: number) {
        context.framebufferTexture2D(context.FRAMEBUFFER, attachment, context.TEXTURE_2D, this.texture, 0);
    }
    bind(context: WebGL2RenderingContext) {
        context.bindTexture(context.TEXTURE_2D, this.texture);
    }
    active(context: WebGL2RenderingContext) {
        context.activeTexture(context.TEXTURE0 + this.unit);
    }
    unbind(context: WebGL2RenderingContext) {
        context.bindTexture(context.TEXTURE_2D, null);
    }
    generateDepth(context: WebGL2RenderingContext) {
        this.texture = context.createTexture();
        context.bindTexture(context.TEXTURE_2D, this.texture);
        context.texImage2D(context.TEXTURE_2D, 0, context.DEPTH_COMPONENT32F, this.width, this.height, 0, context.DEPTH_COMPONENT, context.FLOAT, null);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST);
        context.bindTexture(context.TEXTURE_2D, null);
    }
    generateDiffuse(context: WebGL2RenderingContext) {
        this.texture = context.createTexture();
        context.bindTexture(context.TEXTURE_2D, this.texture);
        context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, this.width, this.height, 0, context.RGBA, context.UNSIGNED_BYTE, null);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST);
        context.bindTexture(context.TEXTURE_2D, null);
    }
    generateSpritesheet(context: WebGL2RenderingContext) {
        if (!this.image) {
            throw new Error("image not exist.")
        }
        this.texture = context.createTexture();
        context.bindTexture(context.TEXTURE_2D, this.texture);
        context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, context.RGBA, context.UNSIGNED_BYTE, this.image);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST);
        context.bindTexture(context.TEXTURE_2D, null);
    }
    generateNormal(context: WebGL2RenderingContext) {
        this.texture = context.createTexture();
        context.bindTexture(context.TEXTURE_2D, this.texture);
        context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, this.width, this.height, 0, context.RGBA, context.UNSIGNED_BYTE, null);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST);
        context.bindTexture(context.TEXTURE_2D, null);
    }
    destory(context: WebGL2RenderingContext) {
        context.deleteTexture(this.texture);
    }

}