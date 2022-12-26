import { gl } from "./global.js";
export default class Shader {
    constructor(vs, fs) {
        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        if (!vertexShader || !fragmentShader) {
            throw new Error("shader not created");
        }
        gl.shaderSource(vertexShader, vs);
        gl.shaderSource(fragmentShader, fs);
        gl.compileShader(vertexShader);
        gl.compileShader(fragmentShader);
        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            throw new Error(gl.getShaderInfoLog(vertexShader) || "vertex shader compile error");
        }
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            throw new Error(gl.getShaderInfoLog(fragmentShader) || "fragment shader compile error");
        }
        const program = gl.createProgram();
        if (!program) {
            throw new Error("program not created");
        }
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error(gl.getProgramInfoLog(program) || "program link error");
        }
        this.program = program;
    }
    useAndGetProgram() {
        gl.useProgram(this.program);
        return this.program;
    }
}
export class DemoShader extends Shader {
    constructor() {
        super(`#version 300 es 
            layout (location = 0) in vec4 a_position; 
             
            void main() { 
              gl_Position = a_position; 
            }`, `#version 300 es 
            precision highp float; 
             
            out vec4 color; 
             
            void main() { 
              color = vec4(1.0); 
            }`);
    }
}
export class DemoRedShader extends Shader {
    constructor() {
        super(`#version 300 es 
            layout (location = 0) in vec4 a_position; 
             
            void main() { 
              gl_Position = a_position; 
            }`, `#version 300 es 
            precision highp float; 
             
            out vec4 color; 
             
            void main() { 
              color = vec4(1.0, 0.0, 0.0, 1.0); 
            }`);
    }
}
//# sourceMappingURL=Shader.js.map