import { device } from "./Device.js";
import { flatten } from "./Vector.js";
export default class Shader {
    constructor(vs, fs) {
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
            throw new Error("program not created");
        }
        device.gl.attachShader(program, vertexShader);
        device.gl.attachShader(program, fragmentShader);
        device.gl.linkProgram(program);
        if (!device.gl.getProgramParameter(program, device.gl.LINK_STATUS)) {
            throw new Error(device.gl.getProgramInfoLog(program) || "program link error");
        }
        this.program = program;
    }
    setMatrix4fv(name, data) {
        device.gl.useProgram(this.program);
        const viewLoc = device.gl.getUniformLocation(this.program, name);
        device.gl.uniformMatrix4fv(viewLoc, false, data);
    }
    setVector4f(name, data) {
        device.gl.useProgram(this.program);
        const viewLoc = device.gl.getUniformLocation(this.program, name);
        device.gl.uniform4fv(viewLoc, flatten([data]));
    }
    setInteger(name, data) {
        device.gl.useProgram(this.program);
        const viewLoc = device.gl.getUniformLocation(this.program, name);
        device.gl.uniform1i(viewLoc, data);
    }
    use() {
        device.gl.useProgram(this.program);
        return this.program;
    }
}
export class TriangleShader extends Shader {
    constructor() {
        super(`#version 300 es 
            layout (location = 0) in vec4 a_position; 
            layout (location = 1) in vec4 a_color; 
            uniform mat4 u_projection; 
            uniform mat4 u_view;
            uniform mat4 u_world;
            out vec4 v_color; 
             
            void main() { 
              v_color = a_color;
              gl_Position = u_projection * u_view * u_world * a_position; 
            }`, `#version 300 es 
            precision highp float; 
            in vec4 v_color; 
            out vec4 color; 
             
            void main() { 
              color = v_color; 
            }`);
    }
}
export class TextShader extends Shader {
    constructor() {
        super(`#version 300 es 
            layout (location = 0) in vec4 a_position; 
            uniform mat4 u_projection; 
            uniform mat4 u_view; 
            out vec2 v_texcoord; 
             
            void main() { 
              // Multiply the position by the matrix. 
              gl_Position = u_projection * u_view * vec4(a_position.xy, 0, 1); 
             
              // Pass the texcoord to the fragment shader. 
              v_texcoord = a_position.zw; 
            }`, `#version 300 es 
            precision highp float; 
             
            // Passed in from the vertex shader. 
            in vec2 v_texcoord; 
            out vec4 color; 
            uniform sampler2D u_texture; 
             
            void main() { 
              color = texture(u_texture, v_texcoord); 
            }`);
    }
}
export class PointShader extends Shader {
    constructor() {
        super(`#version 300 es 
            layout (location = 0) in vec4 a_position; 
            layout (location = 1) in vec4 a_color; 
            uniform mat4 u_projection; 
            uniform mat4 u_view;
            out vec4 v_color; 
            
            void main() { 
              gl_Position = u_projection * u_view * a_position;
              v_color = a_color;
              gl_PointSize = 10.0;
            }`, `#version 300 es 
            precision highp float; 
            in vec4 v_color; 
            out vec4 color; 
             
            void main() { 
              color = v_color; 
            }`);
    }
}
export class LineShader extends Shader {
    constructor() {
        super(`#version 300 es 
            layout (location = 0) in vec4 a_position; 
            uniform mat4 u_projection; 
            uniform mat4 u_view;
            uniform mat4 u_world;
            
            void main() { 
              gl_Position = u_projection * u_view * u_world * a_position;
            }`, `#version 300 es 
            precision highp float; 
            out vec4 color; 
            void main() { 
              color = vec4(0, 0, 0, 1); 
            }`);
    }
}
//# sourceMappingURL=Shader.js.map