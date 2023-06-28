import Cache from "./Cache.js";

export default class TextCache extends Cache<string> {
    private readonly cache: Map<string, string> = new Map();
    async load(name: string): Promise<void> {
        this.cache.set(name, await this.getDevice().readText(name))
    }
    get(name: string): string {
        const text = this.cache.get(name);
        if (text === undefined) throw new Error(`TextCache ${name} not found`);
        return text;

    }

}