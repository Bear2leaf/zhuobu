import Cache from "./Cache.js";

export default class JSONCache extends Cache<Object> {
    private readonly cache: Map<string, Object> = new Map();
    async load(name: string): Promise<void> {
        this.cache.set(name, await this.getDevice().readJson(`${name}`))
    }
    get(name: string): Object {
        const json = this.cache.get(`${name}`);
        if (json === undefined) throw new Error(`JSONCache ${name} not found`);
        return json;

    }

}