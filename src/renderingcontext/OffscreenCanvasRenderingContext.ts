
import ArrayBufferObject from "../contextobject/ArrayBufferObject.js";
import GLVertexArrayObject from "../contextobject/GLVertexArrayObject.js";
import Primitive, { PrimitiveType } from "../contextobject/Primitive.js";
import { Vec4 } from "../geometry/Vector.js";
import Shader from "../shader/Shader.js";
import { TextureIndex } from "../texture/Texture.js";
import RenderingContext, { ArrayBufferIndex } from "./RenderingContext.js";

export default class OffscreenCanvasRenderingContext implements RenderingContext {
    private readonly context: CanvasRenderingContext2D;
    constructor(canvas: HTMLCanvasElement) {
        this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
        console.log(this)
    }
    bindFramebuffer(fboIndex?: number | undefined): void {
        throw new Error("Method not implemented.");
    }
    bindPickReadFramebuffer(fboIndex?: number | undefined): void {
        throw new Error("Method not implemented.");
    }
    makeElementBufferObject(data: Uint16Array): ArrayBufferObject {
        throw new Error("Method not implemented.");
    }
    switchDepthWrite(enable: boolean): void {
        throw new Error("Method not implemented.");
    }
    switchCulling(enable: boolean): void {
        throw new Error("Method not implemented.");
    }
    switchUnpackPremultiplyAlpha(enable: boolean): void {
        throw new Error("Method not implemented.");
    }
    texImage2D_DEPTH24_UINT_NULL(width: number, height: number): void {
        throw  new Error("Method not implemented."); new Error("Method not implemented.");
    }
    texImage2D_RGBA_RGBA_NULL(width: number, height: number): void {
        throw  new Error("Method not implemented.");
    }
    texImage2D_RGBA_RGBA_Image(data: HTMLImageElement): void {
        throw  new Error("Method not implemented.");
    }
    texImage2D_RGBA32F_RGBA_FLOAT(width: number, height: number, data: Float32Array): void {
        throw  new Error("Method not implemented.");
    }
    framebufferDepthTexture2D(textureIndex: number): void {
        throw  new Error("Method not implemented.");
    }
    framebufferPickTexture2D(textureIndex: number): void {
        throw  new Error("Method not implemented.");
    }
    framebufferRenderTexture2D(textureIndex: number): void {
        throw  new Error("Method not implemented.");
    }
    readSinglePixel(x: number, y: number): Vec4 {
        throw  new Error("Method not implemented.");
    }
    createFramebuffer(): number {
        throw  new Error("Method not implemented.");
    }
    createTexture(): number {
        throw  new Error("Method not implemented.");
    }
    activeTexture(bindIndex: TextureIndex): void {
        throw  new Error("Method not implemented.");
    }
    bindTexture(textureIndex?: number): void {
        throw  new Error("Method not implemented.");

    }
    makeVertexArrayObject(): GLVertexArrayObject {
        throw  new Error("Method not implemented.");
    }
    clear(r: number = 0, g: number = 0, b: number = 0, a: number = 1): void {
        throw  new Error("Method not implemented.");
    }
    init(): void {
        throw  new Error("Method not implemented.");
    }
    draw(mode: number, count: number): void {
        throw  new Error("Method not implemented.");
    }
    viewportTo(left: number, top: number, width: number, height: number): void {
        throw  new Error("Method not implemented.");
    }
    makeArrayBufferObject(index: ArrayBufferIndex, data: Float32Array | Uint16Array, size: number): ArrayBufferObject {
        throw  new Error("Method not implemented.");
    }
    switchDepthTest(enable: boolean): void {
        throw  new Error("Method not implemented.");
    }
    switchBlend(enable: boolean): void {
        throw  new Error("Method not implemented.");
    }
    useBlendFuncOneAndOneMinusSrcAlpha(): void {
        throw  new Error("Method not implemented.");
    }
    makePrimitive(type: PrimitiveType): Primitive {
        throw  new Error("Method not implemented.");
    }
    makeShader(vert: string, frag: string): Shader {
        throw  new Error("Method not implemented.");
    }

}
