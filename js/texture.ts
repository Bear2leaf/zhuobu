import ResourceManager from "./resource_manager.js";

export default class Texture2D {
    readonly tex: WebGLTexture;
    internalFormat: number;
    imageFormat: number;
    private readonly wrapS: number;
    private readonly wrapT: number;
    private readonly filterMin: number;
    private readonly filterMax: number;
    constructor() {
        this.tex = ResourceManager.gl.createTexture()!;
        this.internalFormat = ResourceManager.gl.RGB;
        this.imageFormat = ResourceManager.gl.RGB;
        this.wrapS = ResourceManager.gl.REPEAT;
        this.wrapT = ResourceManager.gl.REPEAT;
        this.filterMin = ResourceManager.gl.LINEAR;
        this.filterMax = ResourceManager.gl.LINEAR;
    }
    generate(data: Image | null, width?: number, height?: number, pixelated?: boolean) {
        ResourceManager.gl.bindTexture(ResourceManager.gl.TEXTURE_2D, this.tex);
        if (data) {
            ResourceManager.gl.texImage2D(ResourceManager.gl.TEXTURE_2D, 0, this.internalFormat, this.imageFormat, ResourceManager.gl.UNSIGNED_BYTE, data)
        } else if (width && height) {
            ResourceManager.gl.texImage2D(ResourceManager.gl.TEXTURE_2D, 0, this.internalFormat, width, height, 0, this.imageFormat, ResourceManager.gl.UNSIGNED_BYTE, data)
        } else {
            throw new Error("wrong texture to generate.");
        }
        if (pixelated) {

            ResourceManager.gl.texParameteri(ResourceManager.gl.TEXTURE_2D, ResourceManager.gl.TEXTURE_MIN_FILTER, ResourceManager.gl.NEAREST)
            ResourceManager.gl.texParameteri(ResourceManager.gl.TEXTURE_2D, ResourceManager.gl.TEXTURE_MAG_FILTER, ResourceManager.gl.NEAREST)
        } else {

            ResourceManager.gl.texParameteri(ResourceManager.gl.TEXTURE_2D, ResourceManager.gl.TEXTURE_WRAP_S, this.wrapS)
            ResourceManager.gl.texParameteri(ResourceManager.gl.TEXTURE_2D, ResourceManager.gl.TEXTURE_WRAP_T, this.wrapT)
            ResourceManager.gl.texParameteri(ResourceManager.gl.TEXTURE_2D, ResourceManager.gl.TEXTURE_MIN_FILTER, this.filterMin)
            ResourceManager.gl.texParameteri(ResourceManager.gl.TEXTURE_2D, ResourceManager.gl.TEXTURE_MAG_FILTER, this.filterMax)
        }
        ResourceManager.gl.bindTexture(ResourceManager.gl.TEXTURE_2D, null);
    }
    bind() {
        ResourceManager.gl.bindTexture(ResourceManager.gl.TEXTURE_2D, this.tex);
    }
}