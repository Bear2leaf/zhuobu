import m4 from "./m4";
import ResourceManager from "./resource_manager";
export default class SpriteRenderer {
    constructor(shader) {
        this.shader = shader;
    }
    clear() {
        ResourceManager.gl.clearColor(0.0, 0.0, 0.0, 0.0);
        ResourceManager.gl.clear(ResourceManager.gl.COLOR_BUFFER_BIT);
    }
    drawSprite(texture, position, size, rotate = 0, color = [1, 1, 1]) {
        this.shader.use();
        const model = m4.identity();
        m4.translate(model, position, model);
        m4.translate(model, [0.5 * size[0], 0.5 * size[1], size[2]], model);
        m4.rotateZ(model, rotate, model);
        m4.translate(model, [-0.5 * size[0], -0.5 * size[1], size[2]], model);
        m4.scale(model, size, model);
        this.shader.setMatrix4('model', model);
        this.shader.setVector3f('spriteColor', color);
        ResourceManager.gl.activeTexture(ResourceManager.gl.TEXTURE0);
        texture.bind();
        ResourceManager.gl.drawArrays(ResourceManager.gl.TRIANGLES, 0, 6);
    }
}
//# sourceMappingURL=sprite_renderer.js.map