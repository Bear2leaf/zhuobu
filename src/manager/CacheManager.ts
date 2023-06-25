import Device from "../device/Device.js";
import { FontInfo } from "../drawobject/Text.js";
import GLTF from "../loader/gltf/GLTF.js";
import Manager from "./Manager.js";


export default class CacheManager implements Manager {
    private readonly imageCache: Map<string, HTMLImageElement>;
    private readonly txtCache: Map<string, string>;
    private readonly fontCache: Map<string, FontInfo>;
    private readonly gltfCache: Map<string, GLTF>;
    private readonly glbCache: Map<string, ArrayBuffer>;
    constructor(private readonly device: Device) {
        this.txtCache = new Map();
        this.imageCache = new Map();
        this.fontCache = new Map();
        this.gltfCache = new Map();
        this.glbCache = new Map();
    }

    getVertShaderTxt(name: string) {
        const txt = this.txtCache.get(`static/shader/${name}.vert.sk`);
        if (txt === undefined) throw new Error(`txtCache static/shader/${name}.vert.sk not found`);
        return txt;
    }
    getFragShaderTxt(name: string) {
        const txt = this.txtCache.get(`static/shader/${name}.frag.sk`);
        if (txt === undefined) throw new Error(`txtCache static/shader/${name}.frag.sk not found`);
        return txt;
    }
    getTxt(name: string) {
        const txt = this.txtCache.get(name);
        if (txt === undefined) throw new Error(`txtCache ${name} not found`);
        return txt;
    }
    getResourceImage(name: string) {
        const img = this.imageCache.get(name);
        if (img === undefined) throw new Error(`imageCache resource/texture/${name}.png not found`);
        return img;
    }
    getStaticImage(name: string) {
        const img = this.imageCache.get(`static/font/${name}.png`);
        if (img === undefined) throw new Error(`imageCache static/font/${name}.png not found`);
        return img;
    }
    getFontInfo(name: string) {
        const font = this.fontCache.get(`static/font/${name}.json`);
        if (font === undefined) throw new Error(`fontCache static/font/${name}.json not found`);
        return font;
    }


    async loadImageCache(url: string) {
        url = `resource/texture/${url}.png`
        const img = this.device.createImage() as HTMLImageElement;
        img.src = url;
        await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; });
        this.imageCache.set(url, img);
    }

    async loadGLTFCache(name: string) {
        this.gltfCache.set(`resource/gltf/${name}.gltf`, await this.device.readJson(`resource/gltf/${name}.gltf`) as GLTF)
        this.glbCache.set(`resource/gltf/${name}.bin`, await this.device.readBuffer(`resource/gltf/${name}.bin`))
    }
    async loadFontCache(name: string) {
        this.fontCache.set(`static/font/${name}.json`, await this.device.readJson(`static/font/${name}.json`) as FontInfo)
        const fontTextureUrl = `static/font/${name}.png`
        const img = this.device.createImage() as HTMLImageElement;
        img.src = fontTextureUrl;
        await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; });
        this.imageCache.set(fontTextureUrl, img);
    }

    async loadShaderTxtCache(name: string) {
        this.txtCache.set(`static/shader/${name}.vert.sk`, await this.device.readTxt(`static/shader/${name}.vert.sk`))
        this.txtCache.set(`static/shader/${name}.frag.sk`, await this.device.readTxt(`static/shader/${name}.frag.sk`))
    }
}