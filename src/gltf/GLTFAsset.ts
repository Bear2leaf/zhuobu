export default class GLTFAsset {
    private readonly version: string;
    private readonly generator: string;
    constructor(data: GLTFAsset) {
        this.version = data.version;
        this.generator = data.generator;
    }

}