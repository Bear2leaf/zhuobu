import { FontInfo } from "../drawobject/Text.js";
import Game from "../game/Game.js";
import GLTF from "../loader/gltf/GLTF.js";
import Manager from "./Manager.js";


export default class CacheManager implements Manager {
    getTxtCache() {
        return this.txtCache;
    }
    getImageCache() {
        return this.imageCache;
    }
    getFontCache() {
        return this.fontCache;
    }
    private readonly imageCache: Map<string, HTMLImageElement>;
    private readonly txtCache: Map<string, string>;
    private readonly fontCache: Map<string, FontInfo>;
    private readonly gltfCache: Map<string, GLTF>;
    private readonly glbCache: Map<string, ArrayBuffer>;
    constructor(private readonly game: Game) {
        this.txtCache = new Map();
        this.imageCache = new Map();
        this.fontCache = new Map();
        this.gltfCache = new Map();
        this.glbCache = new Map();
    }

    async loadImageCache(url: string) {
        url = `resource/texture/${url}.png`
        const img = this.game.getDeviceManager().createImage() as HTMLImageElement;
        img.src = url;
        await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; });
        this.imageCache.set(url, img);
    }

    async loadGLTFCache(name: string) {
        this.gltfCache.set(`resource/gltf/${name}.gltf`, await this.game.getDeviceManager().readJson(`resource/gltf/${name}.gltf`) as GLTF)
        this.glbCache.set(`resource/gltf/${name}.bin`, await this.game.getDeviceManager().readBuffer(`resource/gltf/${name}.bin`))
    }
    async loadFontCache(name: string) {
        this.fontCache.set(`static/font/${name}.json`, await this.game.getDeviceManager().readJson(`static/font/${name}.json`) as FontInfo)
        const fontTextureUrl = `static/font/${name}.png`
        const img = this.game.getDeviceManager().createImage() as HTMLImageElement;
        img.src = fontTextureUrl;
        await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; });
        this.imageCache.set(fontTextureUrl, img);
    }

    async loadShaderTxtCache(name: string) {
        this.txtCache.set(`static/shader/${name}.vert.sk`, await this.game.getDeviceManager().readTxt(`static/shader/${name}.vert.sk`))
        this.txtCache.set(`static/shader/${name}.frag.sk`, await this.game.getDeviceManager().readTxt(`static/shader/${name}.frag.sk`))
    }
}