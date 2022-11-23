import m4 from "./m4.js";
import ResourceManager from "./resource_manager.js";
import Shader from "./shader.js";
import Texture2D from "./texture.js";

export default class SpriteRenderer {
    private readonly shader: Shader;
    private vao?: WebGLVertexArrayObject;
    private positionLocation?: number;
    private positionBuffer?: WebGLBuffer;
    constructor(shader: Shader) {
        this.shader = shader;
        this.init();
    }
    init() {
        this.vao = ResourceManager.gl.createVertexArray()!;
        this.positionLocation = ResourceManager.gl.getAttribLocation(this.shader.program!, 'a_position')
        this.positionBuffer = ResourceManager.gl.createBuffer()!;
        ResourceManager.gl.bindBuffer(ResourceManager.gl.ARRAY_BUFFER, this.positionBuffer)
        ResourceManager.gl.bufferData(ResourceManager.gl.ARRAY_BUFFER, new Float32Array([
            // pos      // tex
            0.0, 1.0, 0.0, 1.0,
            1.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 0.0,

            0.0, 1.0, 0.0, 1.0,
            1.0, 1.0, 1.0, 1.0,
            1.0, 0.0, 1.0, 0.0
        ]), ResourceManager.gl.STATIC_DRAW);
        ResourceManager.gl.bindVertexArray(this.vao);
        ResourceManager.gl.enableVertexAttribArray(this.positionLocation)
        ResourceManager.gl.vertexAttribPointer(this.positionLocation, 4, ResourceManager.gl.FLOAT, false, 0, 0);

        ResourceManager.gl.bindBuffer(ResourceManager.gl.ARRAY_BUFFER, null);
    }
    drawSprite(texture: Texture2D, position: Vec3, size: Vec3, rotate: number = 0, color: Vec3 = [1, 1, 1]) {
        
        this.shader.use();
        const model: Mat4 = m4.identity();
        m4.translate(model, position, model);
        m4.translate(model, [0.5 * size[0], 0.5 * size[1], size[2]], model);
        m4.rotateZ(model, rotate, model);
        m4.translate(model, [-0.5 * size[0], -0.5 * size[1], size[2]], model);
        m4.scale(model, size, model);

        this.shader.setMatrix4('model', model);
        this.shader.setVector3f('spriteColor', color);

        ResourceManager.gl.activeTexture(ResourceManager.gl.TEXTURE0)
        texture.bind()

        ResourceManager.gl.bindVertexArray(this.vao!);
        ResourceManager.gl.drawArrays(ResourceManager.gl.TRIANGLES, 0, 6)

    }

}