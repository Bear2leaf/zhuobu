import ArrayBufferObject from "../contextobject/ArrayBufferObject.js";
import VertexArrayObject from "../contextobject/VertexArrayObject.js";
import Primitive, { PrimitiveType } from "../contextobject/Primitive.js";
import Shader from "../shader/Shader.js";
import Texture from "../texture/Texture.js";

export enum ArrayBufferIndex {
    Position = 0,
    Color = 1,
    TextureCoord = 2,
    Normal = 3,
    Weights = 4,
    Joints = 5,
}


export default interface RenderingContext {
    getCanvasWidth(): number;
    getCanvasHeight(): number;
    clear(r?:number, g?:number, b?:number, a?:number): void;
    init(): void;
    draw(mode: number, count: number): void;
    viewportTo(left: number, top: number, width: number, height: number): void;
    makeArrayBufferObject(index: ArrayBufferIndex, data: Float32Array | Uint16Array, size: number): ArrayBufferObject;
    makeElementBufferObject(data: Uint16Array): ArrayBufferObject;
    makeVertexArrayObject(): VertexArrayObject;
    makeTexture(unit: number): Texture;
    switchDepthTest(enable: boolean): void;
    switchDepthWrite(enable: boolean): void;
    switchBlend(enable: boolean): void;
    switchUnpackPremultiplyAlpha(enable: boolean): void;
    useBlendFuncOneAndOneMinusSrcAlpha(): void;
    makePrimitive(type: PrimitiveType): Primitive;
    makeShader(vert: string, frag: string): Shader; 
}