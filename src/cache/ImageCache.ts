import Cache from "./Cache.js";

export default class ImageCache extends Cache<HTMLImageElement> {
    private readonly cache: Map<string, HTMLImageElement> = new Map();
    async load(name: string): Promise<void> {
        const url = name
        const img = this.getDevice().createImage() as HTMLImageElement;
        img.src = url;
        await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; });
        this.cache.set(url, img);
    }
    get(name: string): HTMLImageElement {
        const buffer = this.cache.get(name);
        if (buffer === undefined) throw new Error(`ImageCache ${name} not found`);
        return buffer;

    }

}