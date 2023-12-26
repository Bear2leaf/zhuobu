
import ArrayBufferObject from "../contextobject/ArrayBufferObject.js";
import Primitive, { PrimitiveType } from "../contextobject/Primitive.js";
import UniformBufferObject from "../contextobject/UniformBufferObject.js";
import VertexArrayObject from "../contextobject/VertexArrayObject.js";
import Shader from "../shader/Shader.js";
import { SkyboxArray, TextureBindIndex } from "../texture/Texture.js";

export enum ArrayBufferIndex {
    Position = 0,
    Color = 1,
    TextureCoord = 2,
    Normal = 3,
    Weights = 4,
    Joints = 5,
    Barycentric = 6,
}

export enum UniformBinding {
    Material = 5,
    Light = 4,
    Pick = 3,
    SDF = 2,
    Model = 1,
    Camera = 0,
}

export default interface RenderingContext {
    bindSkyboxTexture(index?: number): unknown;
    putImageData(data: ImageData, dx: number, dy: number): void;
    createImageData(width: number, height: number): ImageData;
    updateSize(width: number, height: number): void;
    updateFont(font: string, textBaseline: CanvasTextBaseline, textAlign: CanvasTextAlign, fillStyle: string): void;
    measureText(char: string): TextMetrics;
    fillText(char: string, x: number, y: number): void;
    clearRect(x: number, y: number, width: number, height: number): void;
    putText(text: string): void;
    texImage2D_DEPTH24_UINT_NULL(width: number, height: number): void;
    texImage2D_RGBA_RGBA_NULL(width: number, height: number): void;
    texImage2D_RGBA_RGBA_Image(data: HTMLImageElement): void;
    texImage2D_RGBA_RGBA_Skybox(data: SkyboxArray): void;
    texImage2D_RGBA32F_RGBA_FLOAT(width: number, height: number, data: Float32Array): void;
    framebufferDepthTexture2D(textureIndex: number): void;
    framebufferPickTexture2D(textureIndex: number): void;
    framebufferRenderTexture2D(textureIndex: number): void;
    framebufferReflectTexture2D(textureIndex: number): void;
    readPixels(x: number, y: number, width: number, height: number): Uint8Array;
    createFramebuffer(): number;
    getImageData(x: number, y: number, width: number, height: number): ImageData;
    createTexture(): number;
    activeTexture(bindIndex: TextureBindIndex): void;
    bindTexture(textureIndex?: number): void;
    bindFramebuffer(fboIndex?: number): void;
    bindReadFramebuffer(fboIndex?: number): void;
    clear(r?: number, g?: number, b?: number, a?: number): void;
    init(): void;
    draw(mode: number, count: number): void;
    viewportTo(left: number, top: number, width: number, height: number): void;
    makeArrayBufferObject(index: ArrayBufferIndex, data: Float32Array | Uint16Array, size: number): ArrayBufferObject;
    makeUniformBlockObject(): UniformBufferObject;
    makeElementBufferObject(data: Uint16Array): ArrayBufferObject;
    makeVertexArrayObject(): VertexArrayObject;
    switchNearestFilter(enable: boolean): void;
    switchRepeat(enable: boolean): void;
    switchDepthTest(enable: boolean): void;
    switchDepthWrite(enable: boolean): void;
    switchBlend(enable: boolean): void;
    switchCulling(enable: boolean): void;
    switchUnpackPremultiplyAlpha(enable: boolean): void;
    useBlendFuncOneAndOneMinusSrcAlpha(): void;
    makePrimitive(type: PrimitiveType): Primitive;
    makeShader(vert: string, frag: string): Shader;
    generatePickColor(): [number, number, number, number];
}