
import ArrayBufferObject from "../contextobject/ArrayBufferObject.js";
import Primitive, { PrimitiveType } from "../contextobject/Primitive.js";
import VertexArrayObject from "../contextobject/VertexArrayObject.js";
import { Vec4 } from "../geometry/Vector.js";
import Shader from "../shader/Shader.js";
import { TextureIndex } from "../texture/Texture.js";

export enum ArrayBufferIndex {
    Position = 0,
    Color = 1,
    TextureCoord = 2,
    Normal = 3,
    Weights = 4,
    Joints = 5,
    Barycentric = 6,
}


export default interface RenderingContext {
    clearRect(x: number, y: number, width: number, height: number): void;
    putText(text: string): void;
    texImage2D_DEPTH24_UINT_NULL(width: number, height: number): void;
    texImage2D_RGBA_RGBA_NULL(width: number, height: number): void;
    texImage2D_RGBA_RGBA_Image(data: ImageBitmapSource): void;
    texImage2D_RGBA32F_RGBA_FLOAT(width: number, height: number, data: Float32Array): void;
    framebufferDepthTexture2D(textureIndex: number): void;
    framebufferPickTexture2D(textureIndex: number): void;
    framebufferRenderTexture2D(textureIndex: number): void;
    readSinglePixel(x: number, y: number): Vec4;
    createFramebuffer(): number;
    getImageData(): ImageBitmapSource;
    createTexture(): number;
    activeTexture(bindIndex: TextureIndex): void;
    bindTexture(textureIndex?: number): void;
    bindFramebuffer(fboIndex?: number): void;
    bindPickReadFramebuffer(fboIndex?: number): void;
    clear(r?: number, g?: number, b?: number, a?: number): void;
    init(): void;
    draw(mode: number, count: number): void;
    viewportTo(left: number, top: number, width: number, height: number): void;
    makeArrayBufferObject(index: ArrayBufferIndex, data: Float32Array | Uint16Array, size: number): ArrayBufferObject;
    makeElementBufferObject(data: Uint16Array): ArrayBufferObject;
    makeVertexArrayObject(): VertexArrayObject;
    switchDepthTest(enable: boolean): void;
    switchDepthWrite(enable: boolean): void;
    switchBlend(enable: boolean): void;
    switchCulling(enable: boolean): void;
    switchUnpackPremultiplyAlpha(enable: boolean): void;
    useBlendFuncOneAndOneMinusSrcAlpha(): void;
    makePrimitive(type: PrimitiveType): Primitive;
    makeShader(vert: string, frag: string): Shader;
}