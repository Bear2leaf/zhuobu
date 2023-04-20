export default class GLTFBuffer {
    private readonly byteLength: number;
    private readonly uri: string;
    constructor(byteLength: number, uri: string) {
        this.byteLength = byteLength;
        this.uri = uri;
    }
}