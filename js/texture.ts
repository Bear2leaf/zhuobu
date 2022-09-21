import ResourceManager from "./resource_manager";

export default class Texture2D {
    private readonly texture: WebGLTexture;
    internalFormat: number;
    imageFormat: number;
    private readonly wrapS: number;
    private readonly wrapT: number;
    private readonly filterMin: number;
    private readonly filterMax: number;
    constructor() {
        this.texture = ResourceManager.gl.createTexture()!;
        this.internalFormat = ResourceManager.gl.RGB;
        this.imageFormat = ResourceManager.gl.RGB;
        this.wrapS = ResourceManager.gl.CLAMP_TO_EDGE;
        this.wrapT = ResourceManager.gl.CLAMP_TO_EDGE;
        this.filterMin = ResourceManager.gl.LINEAR;
        this.filterMax = ResourceManager.gl.LINEAR;
    }
    generate(data: Image) {
        ResourceManager.gl.bindTexture(ResourceManager.gl.TEXTURE_2D, this.texture);
        ResourceManager.gl.texImage2D(ResourceManager.gl.TEXTURE_2D, 0, this.internalFormat, this.imageFormat, ResourceManager.gl.UNSIGNED_BYTE, data)
        ResourceManager.gl.texParameteri(ResourceManager.gl.TEXTURE_2D, ResourceManager.gl.TEXTURE_WRAP_S, this.wrapS)
        ResourceManager.gl.texParameteri(ResourceManager.gl.TEXTURE_2D, ResourceManager.gl.TEXTURE_WRAP_T, this.wrapT)
        ResourceManager.gl.texParameteri(ResourceManager.gl.TEXTURE_2D, ResourceManager.gl.TEXTURE_MIN_FILTER, this.filterMin)
        ResourceManager.gl.texParameteri(ResourceManager.gl.TEXTURE_2D, ResourceManager.gl.TEXTURE_MAG_FILTER, this.filterMax)
        ResourceManager.gl.bindTexture(ResourceManager.gl.TEXTURE_2D, null);
    }
    bind() {
        ResourceManager.gl.bindTexture(ResourceManager.gl.TEXTURE_2D, this.texture);
    }
}