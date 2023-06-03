import RenderingCtx from "../renderingcontext/RenderingCtx.js";
import GLTexture from "../texture/GLTexture.js";
import { TextureIndex } from "../texture/Texture.js";

export default class TextureFactory {
    private readonly gl: RenderingCtx;
    private readonly imageCache: Map<string, HTMLImageElement>;
    constructor(gl: RenderingCtx, imageCache: Map<string, HTMLImageElement>) {
        this.gl = gl;
        this.imageCache = imageCache
    }
    createTexture(imageName: string) {

        const textureImage = this.imageCache.get(`resource/texture/${imageName}.png`);
        if (!textureImage) {
            throw new Error(`image ${imageName} not exist`)
        }
        const texture = this.gl.makeTexture(TextureIndex.Default);
        texture.generate(0, 0, textureImage);
        return texture;
    }
    createFontTexture() {

        const textureImage = this.imageCache.get(`static/font/boxy_bold_font.png`);
        if (!textureImage) {
            throw new Error(`image boxy_bold_font not exist`)
        }
        const texture = this.gl.makeTexture(TextureIndex.Default);
        texture.generate(0, 0, textureImage);
        return texture;
    }
    createJointTexture() {
        return this.gl.makeTexture(TextureIndex.Joint);
    }
}