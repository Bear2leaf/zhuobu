import Camera from "../Camera.js";
import { device } from "../Device.js";
import DrawObject from "../drawobject/DrawObject.js";
import Shader from "../Shader.js";
import { flatten } from "../math/Vector.js";


export default class Renderer {
    private readonly mode: number;
    private readonly vbo: WebGLBuffer | null;
    private readonly ebo: WebGLBuffer | null;
    private readonly vao: WebGLVertexArrayObject | null;
    private readonly shader: Shader;
    constructor(shader: Shader, mode: number) {
        this.mode = mode;
        this.shader = shader;
        this.ebo = device.gl.createBuffer();
        this.vbo = device.gl.createBuffer();
        this.vao = device.gl.createVertexArray();
        device.gl.bindVertexArray(this.vao);
        device.gl.bindBuffer(device.gl.ARRAY_BUFFER, this.vbo);
        device.gl.bindBuffer(device.gl.ELEMENT_ARRAY_BUFFER, this.ebo)
    }
    setTextureUnit() {
        this.shader.use();
        this.shader.setInteger("u_texture", 0);
    }
    render(camera: Camera, drawObject: DrawObject) {
        if (!drawObject.mesh) {
            throw new Error("mesh not exist");
            
        }
        this.shader.use();
        this.shader.setMatrix4fv("u_world", drawObject.worldMatrix.getVertics())
        this.shader.setMatrix4fv("u_view", camera.view.getVertics())
        this.shader.setMatrix4fv("u_projection", camera.projection.getVertics())
        device.gl.bindBuffer(device.gl.ARRAY_BUFFER, this.vbo)
        device.gl.bufferData(device.gl.ARRAY_BUFFER, flatten([...drawObject.mesh.vertices, ...drawObject.mesh.colors]), device.gl.STATIC_DRAW);
        device.gl.bindBuffer(device.gl.ELEMENT_ARRAY_BUFFER, this.ebo)
        device.gl.bufferData(device.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(drawObject.mesh.indices), device.gl.STATIC_DRAW)
        device.gl.enableVertexAttribArray(0);
        device.gl.vertexAttribPointer(0, 4, device.gl.FLOAT, false, 0, 0);
        device.gl.enableVertexAttribArray(1);
        device.gl.vertexAttribPointer(1, 4, device.gl.FLOAT, false, 0, drawObject.mesh.vertices.length * 4 * 4);
        device.gl.drawElements(this.mode, drawObject.mesh.indices.length, device.gl.UNSIGNED_SHORT, 0)
    }
}