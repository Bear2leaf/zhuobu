import GLTFExtension from "./GLTFExtension.js";
import GLTFExtra from "./GLTFExtra.js";

export default class GLTFImage {
    private readonly uri: string;
    private readonly mimeType: string;
    private readonly bufferView: number;
    private readonly extras: GLTFExtra;
    private readonly extensions: GLTFExtension;
    constructor(image: GLTFImage) {
        this.uri = image.uri;
        this.mimeType = image.mimeType;
        this.bufferView = image.bufferView;
        this.extras = image.extras;
        this.extensions = image.extensions;
    }
}