import { device } from "./Device.js";
import { flatten } from "./Vector.js";
export default class Renderer {
    constructor(shader, mode, camera) {
        this.mode = mode;
        this.vertices = [];
        this.colors = [];
        this.indices = [];
        this.shader = shader;
        this.ebo = device.gl.createBuffer();
        this.vbo = device.gl.createBuffer();
        this.vao = device.gl.createVertexArray();
        this.camera = camera;
        device.gl.bindVertexArray(this.vao);
        device.gl.bindBuffer(device.gl.ARRAY_BUFFER, this.vbo);
        device.gl.bindBuffer(device.gl.ELEMENT_ARRAY_BUFFER, this.ebo);
    }
    getCamera() {
        return this.camera;
    }
    setVertices(vertices) {
        this.vertices.splice(0, this.vertices.length, ...vertices);
    }
    setIndices(indices) {
        this.indices.splice(0, this.indices.length, ...indices);
    }
    setColors(colors) {
        this.colors.splice(0, this.colors.length, ...colors);
    }
    updateTransform(matrix) {
        this.shader.setMatrix4fv("u_world", matrix.getVertics());
    }
    setTextureUnit() {
        this.shader.setInteger("u_texture", 0);
    }
    render() {
        this.shader.use();
        this.shader.setMatrix4fv("u_view", this.camera.view.getVertics());
        this.shader.setMatrix4fv("u_projection", this.camera.projection.getVertics());
        device.gl.bindBuffer(device.gl.ARRAY_BUFFER, this.vbo);
        device.gl.enableVertexAttribArray(0);
        device.gl.vertexAttribPointer(0, 4, device.gl.FLOAT, false, 0, 0);
        device.gl.enableVertexAttribArray(1);
        device.gl.vertexAttribPointer(1, 4, device.gl.FLOAT, false, 0, this.vertices.length * 4 * 4);
        device.gl.bufferData(device.gl.ARRAY_BUFFER, flatten([...this.vertices, ...this.colors]), device.gl.STATIC_DRAW);
        device.gl.bindBuffer(device.gl.ELEMENT_ARRAY_BUFFER, this.ebo);
        device.gl.bufferData(device.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), device.gl.STATIC_DRAW);
        device.gl.drawElements(this.mode, this.indices.length, device.gl.UNSIGNED_SHORT, 0);
    }
}
//# sourceMappingURL=Renderer.js.map