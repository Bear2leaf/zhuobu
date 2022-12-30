import { gl } from "./global.js"

export default class Shader {
    private readonly program: WebGLProgram;
    useAndGetProgram() {
        gl.useProgram(this.program);
        return this.program;
    }
    constructor(vs: string, fs: string) {
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
            throw new Error("program not created")
        }
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error(gl.getProgramInfoLog(program) || "program link error");
        }
        this.program = program;
    }
}

export class TriangleShader extends Shader {
    constructor() {
        super(
            `#version 300 es 
            layout (location = 0) in vec4 a_position; 
            layout (location = 1) in vec4 a_color; 
            out vec4 v_color; 
             
            void main() { 
              v_color = a_color;
              gl_Position = a_position; 
            }`,
            `#version 300 es 
            precision highp float; 
            in vec4 v_color; 
            out vec4 color; 
             
            void main() { 
              color = v_color; 
            }`
        )
    }
}
export class PointShader extends Shader {
    constructor() {
        super(
            `#version 300 es 
            layout (location = 0) in vec4 a_position; 
            layout (location = 1) in vec4 a_color; 
            out vec4 v_color; 
            
            void main() { 
              gl_Position = a_position;
              v_color = a_color;
              gl_PointSize = 3.0;
            }`,
            `#version 300 es 
            precision highp float; 
            in vec4 v_color; 
            out vec4 color; 
             
            void main() { 
              color = v_color; 
            }`
        )
    }
}