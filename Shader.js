import {gl} from "./utils.js";
export default class Shader {
    constructor() {
        this.program = null;
        this.locations = {};
    }
    compile(vertexSource, fragmentSource) {
        let sVertex, sFragment;
        // vertex Shader
        sVertex = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(sVertex, vertexSource);
        gl.compileShader(sVertex);
        this.checkCompileErrors(sVertex, "VERTEX");
        // fragment Shader
        sFragment = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(sFragment, fragmentSource);
        gl.compileShader(sFragment);
        this.checkCompileErrors(sFragment, "FRAGMENT");
        // shader program
        this.program = gl.createProgram();
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
    setInteger(name, value, useShader = false) {
        if (useShader) {
            this.use();
        }
        gl.uniform1i(this.getUniformLocation(this.program, name), value);
    }
    setFloat(name, value, useShader = false) {
        if (useShader) {
            this.use();
        }
        gl.uniform1f(this.getUniformLocation(this.program, name), value);
    }
    setVector2f(name, value, useShader = false) {
        if (useShader) {
            this.use();
        }
        gl.uniform2f(this.getUniformLocation(this.program, name), value[0], value[1]);
    }
    setVector3f(name, value, useShader = false) {
        if (useShader) {
            this.use();
        }
        gl.uniform3f(this.getUniformLocation(this.program, name), value[0], value[1], value[2]);
    }
    setVector4f(name, value, useShader = false) {
        if (useShader) {
            this.use();
        }
        gl.uniform4f(this.getUniformLocation(this.program, name), value[0], value[1], value[2], value[3]);
    }
    setMatrix4(name, value, useShader = false) {
        if (useShader) {
            this.use();
        }
        gl.uniformMatrix4fv(this.getUniformLocation(this.program, name), false, value);
    }
    getUniformLocation(program, name) {
        if (this.locations[name] === undefined) {
            this.locations[name] = gl.getUniformLocation(program, name);
        }
        return this.locations[name];
    }
    checkCompileErrors(object, type) {
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
