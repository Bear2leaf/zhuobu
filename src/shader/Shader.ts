import { Vec3, Vec4 } from "../geometry/Vector.js";
import { UniformBindingIndex } from "../renderingcontext/RenderingContext.js";

export default interface Shader {
    setMatrix4fv(name: string, data: Float32Array): void;
    setVector4f(name: string, data: Vec4): void;
    setVector3f(name: string, data: Vec3): void;
    setInteger(name: string, data: number): void;
    setFloat(name: string, data: number): void;
    bindUniform(index: UniformBindingIndex): void;
    use(): void;
}

