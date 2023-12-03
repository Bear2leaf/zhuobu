import ArrayBufferCache from "../cache/ArrayBufferCache.js";
import Cache from "../cache/Cache.js";
import JSONCache from "../cache/FontInfoCache.js";
import ImageCache from "../cache/ImageCache.js";
import TextCache from "../cache/TextCache.js";
import SDFCharacter from "../drawobject/SDFCharacter.js";
import Text, { FontInfo } from "../drawobject/Text.js";
import GLTF from "../gltf/GLTF.js";
import Scene from "../scene/Scene.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";


export default class CacheManager extends Manager<Cache<Object>> {
    private sceneManager?: SceneManager;
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

    }
    init(): void {
        const fontInfo = this.getFontInfo("boxy_bold_font");
        const fontImage = this.getImage("boxy_bold_font");
        this.getSceneManager().first().getComponents(Text).forEach(text => {
            text.create(fontInfo, fontImage.width, fontImage.height);
        });
    }

    update(): void {

    }


    getSceneManager(): SceneManager {
        if (this.sceneManager === undefined) {
            throw new Error("sceneManager is undefined");
        }
        return this.sceneManager;
    }
    setSceneManager(sceneManager: SceneManager) {
        this.sceneManager = sceneManager;
    }
    getVertShaderTxt(name: string) {
        return this.get(TextCache).get(`resources/shader/${name}.vert.sk`);
    }
    getFragShaderTxt(name: string) {
        return this.get(TextCache).get(`resources/shader/${name}.frag.sk`);
    }
    getTxt(name: string) {
        const txt = this.get(TextCache).get(name);
        if (txt === undefined) throw new Error(`txtCache ${name} not found`);
        return txt;
    }
    getGLTF(name: string) {
        const gltf = this.get(JSONCache).get(`resources/gltf/${name}.gltf`);
        if (gltf === undefined) throw new Error(`resources/gltf/${name}.gltf not found`);
        return gltf as GLTF;
    }
    getImage(name: string) {
        return this.get(ImageCache).get(`resources/texture/${name}.png`);
    }
    getFontInfo(name: string) {
        const font = this.get(JSONCache).get(`resources/font/${name}.json`) as FontInfo;
        if (font === undefined) throw new Error(`fontCache resources/font/${name}.json not found`);
        return font;
    }


    async loadImageCache(url: string) {
        await this.get(ImageCache).load(`resources/texture/${url}.png`);
    }

    async loadGLTFCache(name: string) {
        await this.get(JSONCache).load(`resources/gltf/${name}.gltf`)
        await this.get(ArrayBufferCache).load(`resources/gltf/${name}.bin`)
    }
    async loadFontCache(name: string) {
        await this.get(JSONCache).load(`resources/font/${name}.json`)
        await this.get(ImageCache).load(`resources/texture/${name}.png`);
    }

    async loadShaderTxtCache(name: string) {
        await this.get(TextCache).load(`resources/shader/${name}.vert.sk`)
        await this.get(TextCache).load(`resources/shader/${name}.frag.sk`)
    }
}