import ResourceManager from "./resource_manager.js";
export default class Shader {
    constructor() {
        this.program = null;
        this.locations = {};
    }
    compile(vertexSource, fragmentSource) {
        let sVertex, sFragment;
        // vertex Shader
        sVertex = ResourceManager.gl.createShader(ResourceManager.gl.VERTEX_SHADER);
        ResourceManager.gl.shaderSource(sVertex, vertexSource);
        ResourceManager.gl.compileShader(sVertex);
        this.checkCompileErrors(sVertex, "VERTEX");
        // fragment Shader
        sFragment = ResourceManager.gl.createShader(ResourceManager.gl.FRAGMENT_SHADER);
        ResourceManager.gl.shaderSource(sFragment, fragmentSource);
        ResourceManager.gl.compileShader(sFragment);
        this.checkCompileErrors(sFragment, "FRAGMENT");
        // shader program
        this.program = ResourceManager.gl.createProgram();
        ResourceManager.gl.attachShader(this.program, sVertex);
        ResourceManager.gl.attachShader(this.program, sFragment);
        ResourceManager.gl.linkProgram(this.program);
        this.checkCompileErrors(this.program, "PROGRAM");
        // delete the shaders as they're linked into our program now and no longer necessary
        ResourceManager.gl.deleteShader(sVertex);
        ResourceManager.gl.deleteShader(sFragment);
    }
    use() {
        ResourceManager.gl.useProgram(this.program);
        return this;
    }
    setInteger(name, value, useShader = false) {
        if (useShader) {
            this.use();
        }
        ResourceManager.gl.uniform1i(this.getUniformLocation(this.program, name), value);
    }
    setFloat(name, value, useShader = false) {
        if (useShader) {
            this.use();
        }
        ResourceManager.gl.uniform1f(this.getUniformLocation(this.program, name), value);
    }
    setVector2f(name, value, useShader = false) {
        if (useShader) {
            this.use();
        }
        ResourceManager.gl.uniform2f(this.getUniformLocation(this.program, name), value[0], value[1]);
    }
    setVector3f(name, value, useShader = false) {
        if (useShader) {
            this.use();
        }
        ResourceManager.gl.uniform3f(this.getUniformLocation(this.program, name), value[0], value[1], value[2]);
    }
    setVector4f(name, value, useShader = false) {
        if (useShader) {
            this.use();
        }
        ResourceManager.gl.uniform4f(this.getUniformLocation(this.program, name), value[0], value[1], value[2], value[3]);
    }
    setMatrix4(name, value, useShader = false) {
        if (useShader) {
            this.use();
        }
        ResourceManager.gl.uniformMatrix4fv(this.getUniformLocation(this.program, name), false, value);
    }
    getUniformLocation(program, name) {
        if (this.locations[name] === undefined) {
            this.locations[name] = ResourceManager.gl.getUniformLocation(program, name);
        }
        return this.locations[name];
    }
    checkCompileErrors(object, type) {
        if (type != "PROGRAM") {
            const success = ResourceManager.gl.getShaderParameter(object, ResourceManager.gl.COMPILE_STATUS);
            if (!success) {
                console.error(`| ERROR::Shader: Compile-time error: Type: ${type}\n${ResourceManager.gl.getShaderInfoLog(object)}\n-- --------------------------------------------------- --\n`);
            }
        }
        else {
            const success = ResourceManager.gl.getProgramParameter(object, ResourceManager.gl.LINK_STATUS);
            if (!success) {
                console.error(`| ERROR::Shader: Link-time error: Type: ${type}\n${ResourceManager.gl.getProgramInfoLog(object)}\n-- --------------------------------------------------- --\n`);
            }
        }
    }
}
//# sourceMappingURL=shader.js.map