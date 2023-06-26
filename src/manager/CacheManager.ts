import ArrayBufferCache from "../cache/ArrayBufferCache.js";
import Cache from "../cache/Cache.js";
import JSONCache from "../cache/FontInfoCache.js";
import ImageCache from "../cache/ImageCache.js";
import TextCache from "../cache/TextCache.js";
import { FontInfo } from "../drawobject/Text.js";
import Game from "../game/Game.js";
import WithAddGet from "../interface/WithAddGet.js";
import Manager from "./Manager.js";


export default class CacheManager implements Manager, WithAddGet<Cache<Object>, CacheManager> {
    private readonly caches: Cache<Object>[] = [];

    constructor(private readonly game: Game) {
        [
            ArrayBufferCache,
            ImageCache,
            TextCache,
            JSONCache
        ].forEach(o => this.add<Cache<Object>>(o));
    }
    add<T extends Cache<Object>>(ctor: new (from: CacheManager) => T): void {
        const caches = this.caches.filter(m => m instanceof ctor);
        if (caches.length !== 0) {
            throw new Error(`addCache error, cache ${ctor.name} already exist`);
        }
        this.caches.push(new ctor(this));

    }
    get<T extends Cache<Object>>(ctor: new (from: CacheManager) => T): T {
        const caches = this.caches.filter(m => m instanceof ctor);
        if (caches.length === 0) {
            throw new Error(`cache ${ctor.name} not exist`);
        } else if (caches.length > 1) {
            throw new Error(`cache ${ctor.name} is duplicated`);
        } else {
            return caches[0] as T;
        }
    }
    load(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    init(): void {
        throw new Error("Method not implemented.");
    }
    tick(): void {
        throw new Error("Method not implemented.");
    }

    getVertShaderTxt(name: string) {
        return this.get(TextCache).get(`static/shader/${name}.vert.sk`);
    }
    getFragShaderTxt(name: string) {
        return this.get(TextCache).get(`static/shader/${name}.frag.sk`);
    }
    getTxt(name: string) {
        const txt = this.get(TextCache).get(name);
        if (txt === undefined) throw new Error(`txtCache ${name} not found`);
        return txt;
    }
    getResourceImage(name: string) {
        return this.get(ImageCache).get(`resource/texture/${name}.png`);
    }
    getStaticImage(name: string) {
        return this.get(ImageCache).get(`static/texture/${name}.png`);
    }
    getFontInfo(name: string) {
        const font = this.get(JSONCache).get(`static/font/${name}.json`) as FontInfo;
        if (font === undefined) throw new Error(`fontCache static/font/${name}.json not found`);
        return font;
    }


    async loadImageCache(url: string) {
        await this.get(ImageCache).load(`resource/texture/${url}.png`);
    }

    async loadGLTFCache(name: string) {
        await this.get(JSONCache).load(`resource/gltf/${name}.gltf`)
        await this.get(ArrayBufferCache).load(`resource/gltf/${name}.bin`)
    }
    async loadFontCache(name: string) {
        await this.get(JSONCache).load(`static/font/${name}.json`)
        await this.get(ImageCache).load(`static/font/${name}.png`);
    }

    async loadShaderTxtCache(name: string) {
        await this.get(TextCache).load(`static/shader/${name}.vert.sk`)
        await this.get(TextCache).load(`static/shader/${name}.frag.sk`)
    }
    getDevice() {
        return this.game.getDevice();
    }
}