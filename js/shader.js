import ResourceManager from "./resource_manager";
export default class Shader {
    constructor() {
        this.program = null;
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
        const positionLocation = ResourceManager.gl.getAttribLocation(this.program, 'a_position');
        const positionBuffer = ResourceManager.gl.createBuffer();
        ResourceManager.gl.enableVertexAttribArray(positionLocation);
        ResourceManager.gl.bindBuffer(ResourceManager.gl.ARRAY_BUFFER, positionBuffer);
        ResourceManager.gl.bufferData(ResourceManager.gl.ARRAY_BUFFER, new Float32Array([
            // pos      // tex
            0.0, 1.0, 0.0, 1.0,
            1.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 1.0,
            1.0, 1.0, 1.0, 1.0,
            1.0, 0.0, 1.0, 0.0
        ]), ResourceManager.gl.STATIC_DRAW);
        ResourceManager.gl.vertexAttribPointer(positionLocation, 4, ResourceManager.gl.FLOAT, false, 0, 0);
    }
    use() {
        ResourceManager.gl.useProgram(this.program);
        return this;
    }
    setInteger(name, value, useShader = false) {
        if (useShader) {
            this.use();
        }
        ResourceManager.gl.uniform1i(ResourceManager.gl.getUniformLocation(this.program, name), value);
    }
    setVector3f(name, value, useShader = false) {
        if (useShader) {
            this.use();
        }
        ResourceManager.gl.uniform3f(ResourceManager.gl.getUniformLocation(this.program, name), value[0], value[1], value[2]);
    }
    setMatrix4(name, value, useShader = false) {
        if (useShader) {
            this.use();
        }
        ResourceManager.gl.uniformMatrix4fv(ResourceManager.gl.getUniformLocation(this.program, name), false, value);
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