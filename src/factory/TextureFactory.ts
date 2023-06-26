import CacheManager from "../manager/CacheManager.js";
import FactoryManager from "../manager/FactoryManager.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import { TextureIndex } from "../texture/Texture.js";
import Factory from "./Factory.js";

export default class TextureFactory implements Factory {
    private readonly cacheManager: CacheManager = this.factoryManager.getCacheManager();
    private readonly gl: RenderingContext = this.factoryManager.getRenderingContext();
    constructor(private readonly factoryManager: FactoryManager) {
        
    }
    createDefaultTexture() {
        const texture = this.gl.makeTexture(TextureIndex.Default);
        texture.generate(2, 2, new Float32Array([1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1]));
        return texture;
    }
    createTexture(imageName: string) {

        const textureImage = this.cacheManager.getResourceImage(imageName);
        if (!textureImage) {
            throw new Error(`image resource/texture/${imageName}.png not exist`)
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