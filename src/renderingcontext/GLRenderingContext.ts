
import ArrayBufferObject from "../contextobject/ArrayBufferObject.js";
import GLArrayBufferObject from "../contextobject/GLArrayBufferObject.js";
import GLElementBufferObject from "../contextobject/GLElementBufferObject.js";
import GLPrimitive from "../contextobject/GLPrimitive.js";
import GLVertexArrayObject from "../contextobject/GLVertexArrayObject.js";
import Primitive, { PrimitiveType } from "../contextobject/Primitive.js";
import { Vec4 } from "../geometry/Vector.js";
import GLShader from "../shader/GLShader.js";
import Shader from "../shader/Shader.js";
import { TextureBindIndex } from "../texture/Texture.js";
import RenderingContext, { ArrayBufferIndex } from "./RenderingContext.js";

export default class GLRenderingContext implements RenderingContext {
    private readonly gl: WebGL2RenderingContext;
    private readonly allWebGLFBOs: WebGLFramebuffer[] = [];
    private readonly allWebGLTextures: WebGLTexture[] = [];
    constructor(canvas: HTMLCanvasElement) {
        this.gl = canvas.getContext('webgl2') as WebGL2RenderingContext;
    }
    putImageData(data: ImageData, x: number, y: number): void {
        throw new Error("Method not implemented.");
    }
    createImageData(width: number, height: number): ImageData {
        throw new Error("Method not implemented.");
    }
    updateSize(width: number, height: number): void {
        throw new Error("Method not implemented.");
    }
    updateFont(font: string, textBaseline: CanvasTextBaseline, textAlign: CanvasTextAlign, fillStyle: string): void {
        throw new Error("Method not implemented.");
    }
    measureText(char: string): TextMetrics {
        throw new Error("Method not implemented.");
    }
    fillText(char: string, x: number, y: number): void {
        throw new Error("Method not implemented.");
    }
    clearRect(x: number, y: number, width: number, height: number): void {
        throw new Error("Method not implemented.");
    }
    putText(text: string): void {
        throw new Error("Method not implemented.");
    }
    getImageData(): ImageBitmapSource {
        throw new Error("Method not implemented.");
    }
    texImage2D_DEPTH24_UINT_NULL(width: number, height: number): void {
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.DEPTH_COMPONENT24, width, height, 0, this.gl.DEPTH_COMPONENT, this.gl.UNSIGNED_INT, null)
    }
    texImage2D_RGBA_RGBA_NULL(width: number, height: number): void {
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, width, height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null)
    }
    texImage2D_RGBA_RGBA_Image(data: HTMLImageElement): void {
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data)
    }
    texImage2D_RGBA32F_RGBA_FLOAT(width: number, height: number, data: Float32Array): void {
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA32F, width, height, 0, this.gl.RGBA, this.gl.FLOAT, data)
    }
    framebufferDepthTexture2D(textureIndex: number): void {
        const gl = this.gl;
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.allWebGLTextures[textureIndex], 0);
    }
    framebufferPickTexture2D(textureIndex: number): void {
        const gl = this.gl;
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT1, gl.TEXTURE_2D, this.allWebGLTextures[textureIndex], 0);
        this.gl.drawBuffers([this.gl.COLOR_ATTACHMENT0, this.gl.COLOR_ATTACHMENT1]);
    }
    framebufferRenderTexture2D(textureIndex: number): void {
        const gl = this.gl;
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.allWebGLTextures[textureIndex], 0);
        this.gl.drawBuffers([this.gl.COLOR_ATTACHMENT0]);
    }
    readSinglePixel(x: number, y: number): Vec4 {
        const gl = this.gl;
        const pixel = new Uint8Array(4);
        gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
        return new Vec4(pixel[0], pixel[1], pixel[2], pixel[3]);
    }
    createFramebuffer(): number {
        const fbo = this.gl.createFramebuffer();
        if (fbo === null) {
            throw new Error("fbo is null");
        }
        return this.allWebGLFBOs.push(fbo) - 1;
    }
    createTexture(): number {
        const texture = this.gl.createTexture();
        if (texture === null) {
            throw new Error("fbo is null");
        }
        return this.allWebGLTextures.push(texture) - 1;
    }
    activeTexture(bindIndex: TextureBindIndex): void {
        this.gl.activeTexture(this.gl.TEXTURE0 + bindIndex)
    }
    bindTexture(textureIndex?: number): void {
        if (textureIndex === undefined) {
            this.gl.bindTexture(this.gl.TEXTURE_2D, null);
        } else {
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.allWebGLTextures[textureIndex]);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
            this.gl.texParameterf(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameterf(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        }
    }
    bindFramebuffer(fboIndex?: number): void {
        if (fboIndex === undefined) {
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        } else {
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.allWebGLFBOs[fboIndex]);

        }
    }
    bindPickReadFramebuffer(fboIndex?: number): void {
        if (fboIndex === undefined) {
            this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER, null);
        } else {
            this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER, this.allWebGLFBOs[fboIndex]);
            this.gl.readBuffer(this.gl.COLOR_ATTACHMENT1);

        }
    }
    makeElementBufferObject(data: Uint16Array): ArrayBufferObject {
        return new GLElementBufferObject(this.gl, data);
    }
    makeVertexArrayObject(): GLVertexArrayObject {
        return new GLVertexArrayObject(this.gl);
    }
    clear(r: number = 0, g: number = 0, b: number = 0, a: number = 1): void {
        this.gl.clearColor(r, g, b, a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT | this.gl.STENCIL_BUFFER_BIT);
    }
    init(): void {
        this.gl.enable(this.gl.CULL_FACE)
        this.gl.enable(this.gl.DEPTH_TEST)
        this.gl.enable(this.gl.SCISSOR_TEST)

        this.useBlendFuncOneAndOneMinusSrcAlpha();
    }
    draw(mode: number, count: number): void {
        this.gl.drawElements(mode, count, this.gl.UNSIGNED_SHORT, 0)
    }
    viewportTo(left: number, top: number, width: number, height: number): void {
        this.gl.viewport(left, top, width, height);
        this.gl.scissor(left, top, width, height);
    }
    makeArrayBufferObject(index: ArrayBufferIndex, data: Float32Array | Uint16Array, size: number): ArrayBufferObject {
        return new GLArrayBufferObject(this.gl, index, data, size);
    }
    switchDepthTest(enable: boolean): void {
        if (enable) {
            this.gl.enable(this.gl.DEPTH_TEST);
        } else {
            this.gl.disable(this.gl.DEPTH_TEST);
        }
    }
    switchDepthWrite(enable: boolean): void {
        this.gl.depthMask(enable);
    }
    switchBlend(enable: boolean): void {
        if (enable) {
            this.gl.enable(this.gl.BLEND);
        } else {
            this.gl.disable(this.gl.BLEND);
        }
    }
    switchNearestFilter(enable: boolean): void {
        if (enable) {
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        } else {
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        }
    }
    switchCulling(enable: boolean): void {
        if (enable) {
            this.gl.enable(this.gl.CULL_FACE);
        } else {
            this.gl.disable(this.gl.CULL_FACE);
        }
    }
    switchUnpackPremultiplyAlpha(enable: boolean): void {
        this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, enable);
    }
    useBlendFuncOneAndOneMinusSrcAlpha(): void {
        this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.blendFuncSeparate(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA, this.gl.ONE, this.gl.ONE);
    }
    makePrimitive(type: PrimitiveType): Primitive {
        return new GLPrimitive(this.gl, type);
    }
    makeShader(vert: string, frag: string): Shader {
        return new GLShader(this.gl, vert, frag);
    }

}
