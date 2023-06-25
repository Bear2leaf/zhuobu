export default class GLTFAsset {
    private readonly version: string;
    private readonly generator: string;
    constructor(version: string, generator: string) {
        this.version = version;
        this.generator = generator;
    }

}