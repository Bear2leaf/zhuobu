import ResourceManager from "./resource_manager.js";
export default class Texture2D {
    constructor() {
        this.tex = ResourceManager.gl.createTexture();
        this.internalFormat = ResourceManager.gl.RGB;
        this.imageFormat = ResourceManager.gl.RGB;
        this.wrapS = ResourceManager.gl.CLAMP_TO_EDGE;
        this.wrapT = ResourceManager.gl.CLAMP_TO_EDGE;
        this.filterMin = ResourceManager.gl.NEAREST;
        this.filterMax = ResourceManager.gl.NEAREST;
    }
    generate(data, width, height) {
        ResourceManager.gl.bindTexture(ResourceManager.gl.TEXTURE_2D, this.tex);
        if (data) {
            ResourceManager.gl.texImage2D(ResourceManager.gl.TEXTURE_2D, 0, this.internalFormat, this.imageFormat, ResourceManager.gl.UNSIGNED_BYTE, data);
        }
        else if (width && height) {
            ResourceManager.gl.texImage2D(ResourceManager.gl.TEXTURE_2D, 0, this.internalFormat, width, height, 0, this.imageFormat, ResourceManager.gl.UNSIGNED_BYTE, data);
        }
        else {
            throw new Error("wrong texture to generate.");
        }
        ResourceManager.gl.texParameteri(ResourceManager.gl.TEXTURE_2D, ResourceManager.gl.TEXTURE_WRAP_S, this.wrapS);
        ResourceManager.gl.texParameteri(ResourceManager.gl.TEXTURE_2D, ResourceManager.gl.TEXTURE_WRAP_T, this.wrapT);
        ResourceManager.gl.texParameteri(ResourceManager.gl.TEXTURE_2D, ResourceManager.gl.TEXTURE_MIN_FILTER, this.filterMin);
        ResourceManager.gl.texParameteri(ResourceManager.gl.TEXTURE_2D, ResourceManager.gl.TEXTURE_MAG_FILTER, this.filterMax);
        ResourceManager.gl.bindTexture(ResourceManager.gl.TEXTURE_2D, null);
    }
    bind() {
        ResourceManager.gl.bindTexture(ResourceManager.gl.TEXTURE_2D, this.tex);
    }
}
//# sourceMappingURL=texture.js.map