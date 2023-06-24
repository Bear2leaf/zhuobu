import CacheManager from "../manager/CacheManager.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import { TextureIndex } from "../texture/Texture.js";
import Factory from "./Factory.js";

export default class TextureFactory implements Factory {
    createTestTexture(gl: RenderingContext) {
        const texture = gl.makeTexture(TextureIndex.Default);
        texture.generate(2, 2, new Float32Array([1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1]));
        return texture;
    }
    createTexture(gl: RenderingContext, cacheManager: CacheManager, imageName: string) {

        const textureImage = cacheManager.getImageCache().get(`resource/texture/${imageName}.png`);
        if (!textureImage) {
            throw new Error(`image ${imageName} not exist`)
        }
        const texture = gl.makeTexture(TextureIndex.Default);
        texture.generate(0, 0, textureImage);
        return texture;
    }
    createFontTexture(gl: RenderingContext, cacheManager: CacheManager) {

        const textureImage = cacheManager.getImageCache().get(`static/font/boxy_bold_font.png`);
        if (!textureImage) {
            throw new Error(`image boxy_bold_font not exist`)
        }
        const texture = gl.makeTexture(TextureIndex.Default);
        texture.generate(0, 0, textureImage);
        return texture;
    }
    createJointTexture(gl: RenderingContext) {
        return gl.makeTexture(TextureIndex.Joint);
    }
}