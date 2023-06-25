import CacheManager from "../manager/CacheManager.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import { TextureIndex } from "../texture/Texture.js";
import Factory from "./Factory.js";

export default class TextureFactory implements Factory {
    constructor(private readonly gl: RenderingContext
        , private readonly cacheManager: CacheManager
        ){}
    createDefaultTexture() {
        const texture = this.gl.makeTexture(TextureIndex.Default);
        texture.generate(2, 2, new Float32Array([1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1]));
        return texture;
    }
    createTexture(imageName: string) {

        const textureImage = this.cacheManager.getResourceImage(`resource/texture/${imageName}.png`);
        if (!textureImage) {
            throw new Error(`image ${imageName} not exist`)
        }
        const texture = this.gl.makeTexture(TextureIndex.Default);
        texture.generate(0, 0, textureImage);
        return texture;
    }
    createFontTexture() {

        const textureImage = this.cacheManager.getStaticImage(`boxy_bold_font`);
        const texture = this.gl.makeTexture(TextureIndex.Default);
        texture.generate(0, 0, textureImage);
        return texture;
    }
    createJointTexture() {
        return this.gl.makeTexture(TextureIndex.Joint);
    }
}