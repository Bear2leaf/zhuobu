import Texture, { TextureIndex } from "../texture/Texture.js";

export default class TextureFactory {
    private readonly gl: WebGL2RenderingContext;
    private readonly imageCache: Map<string, HTMLImageElement>;
    constructor(gl: WebGL2RenderingContext, imageCache: Map<string, HTMLImageElement>) {
        this.gl = gl;
        this.imageCache = imageCache
    }
    createTexture(imageName: string) {

        const defaultTexture = new Texture(this.gl);
        const defaultTextureImage = this.imageCache.get(`resource/texture/${imageName}.png`);
        if (!defaultTextureImage) {
            throw new Error(`image ${imageName} not exist`)
        }
        defaultTexture.generate(0, 0, defaultTextureImage);
        return defaultTexture;
    }
    createJointTexture() {
        const jointTexture = new Texture(this.gl, this.gl.TEXTURE1, this.gl.CLAMP_TO_EDGE, this.gl.CLAMP_TO_EDGE);
        return jointTexture;
    }
}