import GLContainer from "../component/GLContainer.js";
import TextureContainer from "../component/TextureContainer.js";
import SkinMesh from "../drawobject/SkinMesh.js";
import Text from "../drawobject/Text.js";
import Scene from "../scene/Scene.js";
import DefaultTexture from "../texture/DefaultTexture.js";
import FontTexture from "../texture/FontTexture.js";
import JointTexture from "../texture/JointTexture.js";
import Texture, { TextureIndex } from "../texture/Texture.js";
import CacheManager from "./CacheManager.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";


export default class TextureManager extends Manager<Texture> {
    private cacheManager?: CacheManager;
    private sceneManager?: SceneManager;
    addObjects(): void {
        [
            DefaultTexture,
            FontTexture,
            JointTexture
        ].forEach((ctor) => {
            this.add(ctor);
        });
    }
    async load(): Promise<void> {
        
        await this.getCacheManager().loadFontCache("boxy_bold_font");
    }
    init(): void {
        
        const { gl } = this.getDevice();
        this.get(FontTexture).setFontImage(this.getCacheManager().getStaticImage("boxy_bold_font"));
        this.all().forEach(texture => gl.makeTexture(texture));
        this.getScene().getComponents(GLContainer).forEach(container => container.setRenderingContext(gl));
        this.getScene().getComponents(TextureContainer).forEach(container => container.setTexture(this.get(DefaultTexture)));
        this.getScene().getComponents(SkinMesh).forEach(skinMesh => skinMesh.getEntity().get(TextureContainer).setTexture(this.get(JointTexture), TextureIndex.Joint));
        this.getScene().getComponents(Text).forEach(text => text.getEntity().get(TextureContainer).setTexture(this.get(FontTexture)));
        console.log("TextureManager init");
    }
    update(): void {

    }
    setCacheManager(cacheManager: CacheManager) {
        this.cacheManager = cacheManager;
    }
    getCacheManager(): CacheManager {
        if (this.cacheManager === undefined) {
            throw new Error("cacheManager is undefined");
        }
        return this.cacheManager;
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
    getScene(): Scene {
        return this.getSceneManager().first();
    }
}