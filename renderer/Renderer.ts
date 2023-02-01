import Camera from "../Camera.js";
import { device } from "../Device.js";
import DrawObject from "../drawobject/DrawObject.js";
import Shader from "../Shader.js";
import { flatten } from "../Vector.js";


export default class Renderer {
    private readonly mode: number;
    private readonly vbo: WebGLBuffer | null;
    private readonly ebo: WebGLBuffer | null;
    private readonly vao: WebGLVertexArrayObject | null;
    private readonly shader: Shader;
    private readonly camera: Camera;
    readonly drawObjects: DrawObject[];
    constructor(shader: Shader, mode: number, camera: Camera) {
        this.mode = mode;
        this.shader = shader;
        this.ebo = device.gl.createBuffer();
        this.vbo = device.gl.createBuffer();
        this.vao = device.gl.createVertexArray();
        this.camera = camera;
        this.drawObjects = [];
        device.gl.bindVertexArray(this.vao);
        device.gl.bindBuffer(device.gl.ARRAY_BUFFER, this.vbo);
        device.gl.bindBuffer(device.gl.ELEMENT_ARRAY_BUFFER, this.ebo)
        console.log(this)
    }
    add(drawObject: DrawObject) {
        this.drawObjects.push(drawObject);
    }
    setTextureUnit() {
        this.shader.setInteger("u_texture", 0);
    }
    render() {
        this.shader.use();
        this.drawObjects.forEach(drawObject => {
            drawObject.update();
            this.shader.setMatrix4fv("u_world", drawObject.getWorldMatrix().getVertics())
            this.shader.setMatrix4fv("u_view", this.camera.view.getVertics())
            this.shader.setMatrix4fv("u_projection", this.camera.projection.getVertics())
            device.gl.bindBuffer(device.gl.ARRAY_BUFFER, this.vbo)
            device.gl.enableVertexAttribArray(0);
            device.gl.vertexAttribPointer(0, 4, device.gl.FLOAT, false, 0, 0);
            device.gl.enableVertexAttribArray(1);
            device.gl.vertexAttribPointer(1, 4, device.gl.FLOAT, false, 0, drawObject.getVertices().length * 4 * 4);
            device.gl.bufferData(device.gl.ARRAY_BUFFER, flatten([...drawObject.getVertices(), ...drawObject.getColors()]), device.gl.STATIC_DRAW);
            device.gl.bindBuffer(device.gl.ELEMENT_ARRAY_BUFFER, this.ebo)
            device.gl.bufferData(device.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(drawObject.getIndices()), device.gl.STATIC_DRAW)
            device.gl.drawElements(this.mode, drawObject.getIndices().length, device.gl.UNSIGNED_SHORT, 0)
        })
    }
}