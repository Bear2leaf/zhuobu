import { UniformBinding } from "../contextobject/UniformBufferObject.js";
import { Vec3, Vec4 } from "../geometry/Vector.js";
import { Tuple } from "../map/util.js";

export default interface Shader {
    updateUniform(key: string, value: number): void;
    updateUniform(key: "u_eye", value: Float32Array): void;
    updateUniform(key: "u_isortho", value: boolean): void;
    updateUniform(key: "u_offset"| "u_worldOffset" , value: Tuple<number, 2>): void;
    updateUniform(key: "u_target" | "u_up" | "u_lightDirection" | "sunPosition"  | "cameraPosition", value: Tuple<number, 3>): void;
    updateUniform(key: "u_perspective", value: [number, number, number, number]): void;
    updateUniform(key: "u_model" | "modelMatrix", value: Tuple<number, 16>): void;
    updateUniform(key: string, value: boolean | number | Tuple<number, 2> | Tuple<number, 3> | Tuple<number, 4> | Tuple<number, 16>): void;
    setBool(name: string, data: number): void;
    setMatrix4fv(name: string, data: Float32Array): void;
    setVector4f(name: string, data: Vec4): void;
    setVector3f(name: string, data: Vec3): void;
    setInteger(name: string, data: number): void;
    setFloat(name: string, data: number): void;
    bindUniform(index: UniformBinding): void;
    use(): void;
}

