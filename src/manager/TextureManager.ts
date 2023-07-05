import GLContainer from "../component/GLContainer.js";
import TextureContainer from "../component/TextureContainer.js";
import Text from "../drawobject/Text.js";
import DemoScene from "../scene/DemoScene.js";
import Scene from "../scene/Scene.js";
import DefaultTexture from "../texture/DefaultTexture.js";
import FontTexture from "../texture/FontTexture.js";
import Texture from "../texture/Texture.js";
import CacheManager from "./CacheManager.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";


export default class TextureManager extends Manager<Texture> {
    private cacheManager?: CacheManager;
    private sceneManager?: SceneManager;
    private ready = false;
    init(): void {
        [
            DefaultTexture,
            FontTexture
        ].forEach((ctor) => {
            this.add(ctor);
        });
        console.log("TextureManager init");
    }
    update(): void {
        if (!this.ready) {
            const { gl } = this.getDevice();
            this.get(FontTexture).setFontImage(this.getCacheManager().getStaticImage("boxy_bold_font"));
            this.all().forEach(texture => gl.makeTexture(texture));
            this.getScene().getComponents(GLContainer).forEach(container => container.setRenderingContext(gl));
            this.getScene().getComponents(TextureContainer).forEach(container => container.setTexture(this.get(DefaultTexture)));
            this.getScene().getComponents(Text).forEach(text => text.getEntity().get(TextureContainer).setTexture(this.get(FontTexture)));
            this.ready = true;
        }

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
        return this.getSceneManager().get(DemoScene);
    }
}