import ArrayBufferCache from "../cache/ArrayBufferCache.js";
import JSONCache from "../cache/JSONCache.js";
import ImageCache from "../cache/ImageCache.js";
import TextCache from "../cache/TextCache.js";
import GLTF from "../gltf/GLTF.js";
import Device from "../device/Device.js";
import { SkyboxArray } from "../renderingcontext/RenderingContext.js";


export default class CacheManager {
    private readonly arrayBufferCache: ArrayBufferCache = new ArrayBufferCache();
    private readonly imageCache: ImageCache = new ImageCache();
    private readonly textCache: TextCache = new TextCache();
    private readonly jsonCache: JSONCache = new JSONCache();
    
    setDevice(device: Device) {
        this.arrayBufferCache.setDevice(device);
        this.imageCache.setDevice(device);
        this.textCache.setDevice(device);
        this.jsonCache.setDevice(device);
    }


    getArrayBufferCache(): ArrayBufferCache {
        return this.arrayBufferCache;
    }
    getImageCache(): ImageCache {
        return this.imageCache;
    }
    getVertShaderTxt(name: string) {
        return this.textCache.get(`/resources/shader/${name}.vert.sk`);
    }
    getFragShaderTxt(name: string) {
        return this.textCache.get(`/resources/shader/${name}.frag.sk`);
    }
    getTxt(name: string) {
        const txt = this.textCache.get(name);
        if (txt === undefined) throw new Error(`txtCache ${name} not found`);
        return txt;
    }
    getGLTF(name: string) {
        const gltf = this.jsonCache.get(`/resources/gltf/${name}.gltf`);
        if (gltf === undefined) throw new Error(`resources/gltf/${name}.gltf not found`);
        return gltf as GLTF;
    }
    getImage(name: string) {
        return this.imageCache.get(`/resources/texture/${name}.png`);
    }
    getSkybox(name: string): SkyboxArray {
        return [
            this.imageCache.get(`/resources/texture/skybox/${name}_back.png`),
            this.imageCache.get(`/resources/texture/skybox/${name}_down.png`),
            this.imageCache.get(`/resources/texture/skybox/${name}_front.png`),
            this.imageCache.get(`/resources/texture/skybox/${name}_left.png`),
            this.imageCache.get(`/resources/texture/skybox/${name}_right.png`),
            this.imageCache.get(`/resources/texture/skybox/${name}_up.png`)
        ]
    }
    getSoundfont(name: string) {
        const font = this.jsonCache.get(`/resources/soundfont/${name}.json`);
        if (font === undefined) throw new Error(`soundfont resources/soundfont/${name}.json not found`);
        return font;
    }
    getMidi(name: string) {
        const midi = this.arrayBufferCache.get(`/resources/midi/${name}.bin`);
        if (midi === undefined) throw new Error(`fontCache resources/midi/${name}.bin not found`);
        return midi;
    }
    getWav(name: string) {
        const wav = this.arrayBufferCache.get(`/resources/audio/${name}.wav`);
        if (wav === undefined) throw new Error(`audio resources/audio/${name}.wav not found`);
        return wav;
    }


    async loadImageCache(url: string) {
        await this.imageCache.load(`/resources/texture/${url}.png`);
    }
    async loadSkyboxCache(url: string) {
        await this.imageCache.load(`/resources/texture/skybox/${url}_back.png`),
        await this.imageCache.load(`/resources/texture/skybox/${url}_down.png`),
        await this.imageCache.load(`/resources/texture/skybox/${url}_front.png`),
        await this.imageCache.load(`/resources/texture/skybox/${url}_left.png`),
        await this.imageCache.load(`/resources/texture/skybox/${url}_right.png`),
        await this.imageCache.load(`/resources/texture/skybox/${url}_up.png`)
    }

    async loadGLTFCache(name: string) {
        await this.jsonCache.load(`/resources/gltf/${name}.gltf`)
        const images = (this.getGLTF(name) as GLTF)['images'];
        if (images !== undefined) {
            for (const image of images) {
                await this.imageCache.load(`/resources/${image["uri"].replace("../", "")}`);
            }
        }
        await this.arrayBufferCache.load(`/resources/gltf/${name}.bin`)
    }
    async loadSoundFontCache(name: string) {
        await this.jsonCache.load(`/resources/soundfont/${name}.json`)
    }
    async loadWavCache(name: string) {
        await this.arrayBufferCache.load(`/resources/audio/${name}.wav`)
    }
    async loadMidiCache(name: string) {
        await this.arrayBufferCache.load(`/resources/midi/${name}.bin`)
    }

    async loadShaderTxtCache(name: string) {
        await this.textCache.load(`/resources/shader/${name}.vert.sk`)
        await this.textCache.load(`/resources/shader/${name}.frag.sk`)
    }
}