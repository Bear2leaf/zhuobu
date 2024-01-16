import GLTFExtension from "./GLTFExtension.js";
import GLTFExtra from "./GLTFExtra.js";

export default class GLTFImage {
    private readonly uri: string;
    private readonly mimeType: string;
    private readonly bufferView: number;
    private readonly extras: GLTFExtra;
    private readonly extensions: GLTFExtension;
    private image?: HTMLImageElement;
    constructor(image: GLTFImage) {
        this.uri = image.uri;
        this.mimeType = image.mimeType;
        this.bufferView = image.bufferView;
        this.extras = image.extras;
        this.extensions = image.extensions;
    }
    getUri(): string {
        return this.uri;
    }
    setImage(image: HTMLImageElement) {
        this.image = image;
    }
    getImage(): HTMLImageElement {
        if (!this.image) {
            throw new Error("Image not loaded");
        }
        return this.image;
    }

}