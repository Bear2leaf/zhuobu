import device from "../device/Device.js";
import { flatten, Vec3, Vec4 } from "../math/Vector.js";

export default class Shader {
    private readonly program: WebGLProgram;
    private readonly locMap: Map<string, WebGLUniformLocation | null>;
    setMatrix4fv(name: string, data: Float32Array) {
        let loc = this.locMap.get(name);
        if (loc !== undefined) {
        } else {
            loc = device.gl.getUniformLocation(this.program, name);
            this.locMap.set(name, loc);
        }
        device.gl.uniformMatrix4fv(loc, false, data)
    }
    setVector4f(name: string, data: Vec4) {
        let loc = this.locMap.get(name);
        if (loc !== undefined) {
        } else {
            loc = device.gl.getUniformLocation(this.program, name);
            this.locMap.set(name, loc);
        }
        device.gl.uniform4fv(loc, flatten([data]))
    }
    setVector3f(name: string, data: Vec3) {
        let loc = this.locMap.get(name);
        if (loc !== undefined) {
        } else {
            loc = device.gl.getUniformLocation(this.program, name);
            this.locMap.set(name, loc);
        }
        device.gl.uniform3fv(loc, flatten([data]))
    }
    setInteger(name: string, data: number) {
        let loc = this.locMap.get(name);
        if (loc !== undefined) {
        } else {
            loc = device.gl.getUniformLocation(this.program, name);
            this.locMap.set(name, loc);
        }
        device.gl.uniform1i(loc, data)
    }
    use() {
        device.gl.useProgram(this.program);
        return this.program;
    }
    constructor(vs: string, fs: string) {
        this.locMap = new Map();
        const vertexShader = device.gl.createShader(device.gl.VERTEX_SHADER);
        const fragmentShader = device.gl.createShader(device.gl.FRAGMENT_SHADER);
        if (!vertexShader || !fragmentShader) {
            throw new Error("shader not created");
        }
        device.gl.shaderSource(vertexShader, vs);
        device.gl.shaderSource(fragmentShader, fs);
        device.gl.compileShader(vertexShader);
        device.gl.compileShader(fragmentShader);
        if (!device.gl.getShaderParameter(vertexShader, device.gl.COMPILE_STATUS)) {
            throw new Error(device.gl.getShaderInfoLog(vertexShader) || "vertex shader compile error");
        }
        if (!device.gl.getShaderParameter(fragmentShader, device.gl.COMPILE_STATUS)) {
            throw new Error(device.gl.getShaderInfoLog(fragmentShader) || "fragment shader compile error");
        }
        const program = device.gl.createProgram();
        if (!program) {
            throw new Error("program not created")
        }
        device.gl.attachShader(program, vertexShader);
        device.gl.attachShader(program, fragmentShader);
        device.gl.linkProgram(program);
        if (!device.gl.getProgramParameter(program, device.gl.LINK_STATUS)) {
            throw new Error(device.gl.getProgramInfoLog(program) || "program link error");
        }
        this.program = program;
    }
}

