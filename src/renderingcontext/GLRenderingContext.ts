
import ArrayBufferObject from "../contextobject/ArrayBufferObject.js";
import GLArrayBufferObject from "../contextobject/GLArrayBufferObject.js";
import GLElementBufferObject from "../contextobject/GLElementBufferObject.js";
import GLPrimitive from "../contextobject/GLPrimitive.js";
import GLUniformBufferObject from "../contextobject/GLUniformBufferObject.js";
import GLVertexArrayObject from "../contextobject/GLVertexArrayObject.js";
import Primitive, { PrimitiveType } from "../contextobject/Primitive.js";
import UniformBufferObject from "../contextobject/UniformBufferObject.js";
import GLShader from "../shader/GLShader.js";
import Shader from "../shader/Shader.js";
import { SkyboxArray, TextureBindIndex } from "../texture/Texture.js";
import RenderingContext, { ArrayBufferIndex } from "./RenderingContext.js";

export default class GLRenderingContext implements RenderingContext {
    private readonly gl: WebGL2RenderingContext;
    private readonly allWebGLFBOs: WebGLFramebuffer[] = [];
    private readonly allWebGLTextures: WebGLTexture[] = [];
    private colorCounter = 0;
    constructor(canvas: HTMLCanvasElement) {
        this.gl = canvas.getContext('webgl2') as WebGL2RenderingContext;
    }
    generatePickColor(): [number, number, number, number] {
        const color = this.colorCounter++;
        if (color >= 0xffffff) {
            throw new Error("not enough color")
        }
        const r = (color & 0xff);
        const g = ((color >> 8) & 0xff);
        const b = ((color >> 16) & 0xff);
        return [r, g, b, 255];
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
    getImageData(): ImageData {
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
    texImage2D_RGBA_RGBA_Skybox(data: SkyboxArray): void {
        const gl = this.gl;
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data[4]);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data[3]);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data[5]);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data[1]);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data[2]);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data[0]);

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
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT3, gl.TEXTURE_2D, this.allWebGLTextures[textureIndex], 0);
        this.gl.drawBuffers([this.gl.COLOR_ATTACHMENT0, this.gl.COLOR_ATTACHMENT1, this.gl.COLOR_ATTACHMENT2, this.gl.COLOR_ATTACHMENT3]);
    }
    framebufferReflectTexture2D(textureIndex: number): void {
        const gl = this.gl;
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT2, gl.TEXTURE_2D, this.allWebGLTextures[textureIndex], 0);
        this.gl.drawBuffers([this.gl.COLOR_ATTACHMENT0, this.gl.COLOR_ATTACHMENT1, this.gl.COLOR_ATTACHMENT2]);
    }
    readPixels(x: number, y: number, width: number, height: number): Uint8Array {
        const gl = this.gl;
        const pixel = new Uint8Array(4 * width * height);
        gl.readPixels(x, y, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
        return pixel;
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
    bindSkyboxTexture(index?: number): void {
        if (index === undefined) {
            this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, null);
        } else {
            this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, this.allWebGLTextures[index]);
            this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
            this.gl.texParameterf(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameterf(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        }

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
    bindReadFramebuffer(fboIndex?: number): void {
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
    makeUniformBlockObject(): UniformBufferObject {
        return new GLUniformBufferObject(this.gl);
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
