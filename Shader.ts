import { device } from "./global.js"

export default class Shader {
    private readonly program: WebGLProgram;
    useAndGetProgram() {
        device.gl.useProgram(this.program);
        return this.program;
    }
    constructor(vs: string, fs: string) {
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