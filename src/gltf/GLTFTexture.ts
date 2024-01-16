export default class GLTFTexture {
    private readonly sampler: number;
    private readonly source: number;
    constructor(texture: GLTFTexture) {
        this.sampler = texture.sampler;
        this.source = texture.source;
    }
    getSampler() {
        return this.sampler;
    }
    getSource() {
        return this.source;
    }
}