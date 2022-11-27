import ResourceManager from "./resource_manager.js";
export default class TextRenderer {
    constructor(shader) {
        this.shader = shader;
        this.fontInfo = {
            letterHeight: 8,
            spaceWidth: 8,
            spacing: -1,
            textureWidth: 64,
            textureHeight: 40,
            glyphInfos: {
                ' ': { x: 7, y: 0, width: 1, },
                'a': { x: 0, y: 0, width: 8, },
                'b': { x: 8, y: 0, width: 8, },
                'c': { x: 16, y: 0, width: 8, },
                'd': { x: 24, y: 0, width: 8, },
                'e': { x: 32, y: 0, width: 8, },
                'f': { x: 40, y: 0, width: 8, },
                'g': { x: 48, y: 0, width: 8, },
                'h': { x: 56, y: 0, width: 8, },
                'i': { x: 0, y: 8, width: 8, },
                'j': { x: 8, y: 8, width: 8, },
                'k': { x: 16, y: 8, width: 8, },
                'l': { x: 24, y: 8, width: 8, },
                'm': { x: 32, y: 8, width: 8, },
                'n': { x: 40, y: 8, width: 8, },
                'o': { x: 48, y: 8, width: 8, },
                'p': { x: 56, y: 8, width: 8, },
                'q': { x: 0, y: 16, width: 8, },
                'r': { x: 8, y: 16, width: 8, },
                's': { x: 16, y: 16, width: 8, },
                't': { x: 24, y: 16, width: 8, },
                'u': { x: 32, y: 16, width: 8, },
                'v': { x: 40, y: 16, width: 8, },
                'w': { x: 48, y: 16, width: 8, },
                'x': { x: 56, y: 16, width: 8, },
                'y': { x: 0, y: 24, width: 8, },
                'z': { x: 8, y: 24, width: 8, },
                '0': { x: 16, y: 24, width: 8, },
                '1': { x: 24, y: 24, width: 8, },
                '2': { x: 32, y: 24, width: 8, },
                '3': { x: 40, y: 24, width: 8, },
                '4': { x: 48, y: 24, width: 8, },
                '5': { x: 56, y: 24, width: 8, },
                '6': { x: 0, y: 32, width: 8, },
                '7': { x: 8, y: 32, width: 8, },
                '8': { x: 16, y: 32, width: 8, },
                '9': { x: 24, y: 32, width: 8, },
                '-': { x: 32, y: 32, width: 8, },
                '*': { x: 40, y: 32, width: 8, },
                '!': { x: 48, y: 32, width: 8, },
                '?': { x: 56, y: 32, width: 8, },
            },
        };
        this.init();
    }
    init() {
        this.vao = ResourceManager.gl.createVertexArray();
        this.positionLocation = ResourceManager.gl.getAttribLocation(this.shader.program, 'a_position');
        this.positionBuffer = ResourceManager.gl.createBuffer();
        ResourceManager.gl.bindVertexArray(this.vao);
        ResourceManager.gl.bindBuffer(ResourceManager.gl.ARRAY_BUFFER, this.positionBuffer);
        ResourceManager.gl.bufferData(ResourceManager.gl.ARRAY_BUFFER, 6 * 4 * 4, ResourceManager.gl.DYNAMIC_DRAW);
        ResourceManager.gl.enableVertexAttribArray(this.positionLocation);
        ResourceManager.gl.vertexAttribPointer(this.positionLocation, 4, ResourceManager.gl.FLOAT, false, 0, 0);
    }
    drawText(texture, text, x, y, scale, color) {
        this.shader.use();
        this.shader.setVector3f("textColor", color);
        ResourceManager.gl.activeTexture(ResourceManager.gl.TEXTURE0);
        ResourceManager.gl.bindVertexArray(this.vao);
        for (const c of text) {
            const ch = this.fontInfo.glyphInfos[c] || this.fontInfo.glyphInfos[String.fromCharCode(c.charCodeAt(0) + 32)];
            const xpos = x;
            const ypos = y;
            const w = (this.fontInfo.spaceWidth) * scale;
            const h = this.fontInfo.letterHeight * scale;
            // update VBO for each character
            const vertices = new Float32Array([
                xpos, ypos + h, (ch.x) / this.fontInfo.textureWidth, (ch.y + this.fontInfo.letterHeight) / this.fontInfo.textureHeight,
                xpos + w, ypos, (ch.x + ch.width + this.fontInfo.spacing) / this.fontInfo.textureWidth, (ch.y) / this.fontInfo.textureHeight,
                xpos, ypos, (ch.x) / this.fontInfo.textureWidth, (ch.y) / this.fontInfo.textureHeight,
                xpos, ypos + h, (ch.x) / this.fontInfo.textureWidth, (ch.y + this.fontInfo.letterHeight) / this.fontInfo.textureHeight,
                xpos + w, ypos + h, (ch.x + ch.width + this.fontInfo.spacing) / this.fontInfo.textureWidth, (ch.y + this.fontInfo.letterHeight) / this.fontInfo.textureHeight,
                xpos + w, ypos, (ch.x + ch.width + this.fontInfo.spacing) / this.fontInfo.textureWidth, (ch.y) / this.fontInfo.textureHeight
            ]);
            texture.bind();
            ResourceManager.gl.bindVertexArray(this.vao);
            ResourceManager.gl.bindBuffer(ResourceManager.gl.ARRAY_BUFFER, this.positionBuffer);
            ResourceManager.gl.bufferSubData(ResourceManager.gl.ARRAY_BUFFER, 0, vertices, 0);
            ResourceManager.gl.bindBuffer(ResourceManager.gl.ARRAY_BUFFER, null);
            ResourceManager.gl.drawArrays(ResourceManager.gl.TRIANGLES, 0, 6);
            x += w;
        }
        ResourceManager.gl.bindVertexArray(null);
        ResourceManager.gl.bindTexture(ResourceManager.gl.TEXTURE_2D, null);
    }
}
//# sourceMappingURL=text_renderer.js.map