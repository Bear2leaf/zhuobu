import ArrayBufferCache from "../cache/ArrayBufferCache.js";
import Cache from "../cache/Cache.js";
import JSONCache from "../cache/FontInfoCache.js";
import ImageCache from "../cache/ImageCache.js";
import TextCache from "../cache/TextCache.js";
import { FontInfo } from "../drawobject/Text.js";
import GLTF from "../gltf/GLTF.js";
import Manager from "./Manager.js";


export default class CacheManager extends Manager<Cache<Object>> {
    addObjects() {

        [
            ArrayBufferCache,
            ImageCache,
            TextCache,
            JSONCache
        ].forEach(o => {
            this.add<Cache<Object>>(o);
            this.get<Cache<Object>>(o).setDevice(this.getDevice());
        });
    }
    async load(): Promise<void> {
        
            await this.loadShaderTxtCache("Sprite");
            await this.loadShaderTxtCache("Point");
            await this.loadShaderTxtCache("VertexColorTriangle");
            await this.loadShaderTxtCache("SkinMesh");
            await this.loadShaderTxtCache("Mesh");
            await this.loadFontCache("boxy_bold_font");
            await this.loadGLTFCache("whale.CYCLES");
            await this.loadGLTFCache("hello");
            await this.loadGLTFCache("hello-multi");
    }
    init(): void {
        console.log("CacheManager init");
    }

    update(): void {

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
    getGLTF(name: string) {
        const gltf = this.get(JSONCache).get(`resource/gltf/${name}.gltf`);
        if (gltf === undefined) throw new Error(`resource/gltf/${name}.gltf not found`);
        return gltf as GLTF;
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
        await this.get(ImageCache).load(`static/texture/${name}.png`);
    }

    async loadShaderTxtCache(name: string) {
        await this.get(TextCache).load(`static/shader/${name}.vert.sk`)
        await this.get(TextCache).load(`static/shader/${name}.frag.sk`)
    }
}