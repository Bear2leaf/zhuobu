import {gl} from "./utils.js";
export default class Shader {
    program: WebGLProgram;
    constructor() {
        this.program = gl.createProgram()!;
    }
    compile(vertexSource: string, fragmentSource: string) {
        let sVertex: WebGLShader, sFragment: WebGLShader;
        // vertex Shader
        sVertex = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(sVertex, vertexSource);
        gl.compileShader(sVertex);
        this.checkCompileErrors(sVertex, "VERTEX");
        // fragment Shader
        sFragment = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(sFragment, fragmentSource);
        gl.compileShader(sFragment);
        this.checkCompileErrors(sFragment, "FRAGMENT");
        // shader program
        gl.attachShader(this.program, sVertex);
        gl.attachShader(this.program, sFragment);
        gl.linkProgram(this.program);
        this.checkCompileErrors(this.program, "PROGRAM");
        // delete the shaders as they're linked into our program now and no longer necessary
        gl.deleteShader(sVertex);
        gl.deleteShader(sFragment);
    }
    use() {
        gl.useProgram(this.program);
        return this;
    }
    setInteger(name: string, value: number, useShader = false) {
        if (useShader) {
            this.use();
        }
        gl.uniform1i(this.getUniformLocation(this.program, name), value);
    }
    setFloat(name: string, value: number, useShader = false) {
        if (useShader) {
            this.use();
        }
        gl.uniform1f(this.getUniformLocation(this.program, name), value);
    }
    setVector2f(name: string, value: [number, number], useShader = false) {
        if (useShader) {
            this.use();
        }
        gl.uniform2f(this.getUniformLocation(this.program, name), value[0], value[1]);
    }
    setVector3f(name: string, value: [number, number, number], useShader = false) {
        if (useShader) {
            this.use();
        }
        gl.uniform3f(this.getUniformLocation(this.program, name), value[0], value[1], value[2]);
    }
    setVector4f(name: string, value: [number, number, number, number], useShader = false) {
        if (useShader) {
            this.use();
        }
        gl.uniform4f(this.getUniformLocation(this.program, name), value[0], value[1], value[2], value[3]);
    }
    setMatrix4(name: string, value: number[], useShader = false) {
        if (useShader) {
            this.use();
        }
        gl.uniformMatrix4fv(this.getUniformLocation(this.program, name), false, value);
    }
    getUniformLocation(program: WebGLProgram, name: string) {
        return gl.getUniformLocation(program, name);
    }
    checkCompileErrors(object: WebGLShader | WebGLProgram, type: string) {
        if (type != "PROGRAM") {
            const success = gl.getShaderParameter(object, gl.COMPILE_STATUS);
            if (!success) {
                console.error(`| ERROR::Shader: Compile-time error: Type: ${type}\n${gl.getShaderInfoLog(object)}\n-- --------------------------------------------------- --\n`);
            }
        }
        else {
            const success = gl.getProgramParameter(object, gl.LINK_STATUS);
            if (!success) {
                console.error(`| ERROR::Shader: Link-time error: Type: ${type}\n${gl.getProgramInfoLog(object)}\n-- --------------------------------------------------- --\n`);
            }
        }
    }
}
