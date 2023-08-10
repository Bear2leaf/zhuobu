import DepthMap from "../component/DepthMap.js";
import Flowers from "../component/Flowers.js";
import GLContainer from "../component/GLContainer.js";
import PickMap from "../component/PickMap.js";
import TextureContainer from "../component/TextureContainer.js";
import SkinMesh from "../drawobject/SkinMesh.js";
import Text from "../drawobject/Text.js";
import Scene from "../scene/Scene.js";
import DefaultTexture from "../texture/DefaultTexture.js";
import DepthTexture from "../texture/DepthTexture.js";
import FlowerTexture from "../texture/FlowerTexture.js";
import FontTexture from "../texture/FontTexture.js";
import JointTexture from "../texture/JointTexture.js";
import PickTexture from "../texture/PickTexture.js";
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
            FlowerTexture,
            JointTexture,
            DepthTexture,
            PickTexture,
        ].forEach((ctor) => {
            this.add(ctor);
        });
    }
    async load(): Promise<void> {
        
        await this.getCacheManager().loadImageCache("flowers");
        await this.getCacheManager().loadFontCache("boxy_bold_font");
    }
    init(): void {
        
        const { gl } = this.getDevice();
        this.get(FontTexture).setFontImage(this.getCacheManager().getImage("boxy_bold_font"));
        this.get(FlowerTexture).setImage(this.getCacheManager().getImage("flowers"));
        this.all().forEach(texture => texture.create(gl));
        const { windowWidth, windowHeight } = this.getDevice().getWindowInfo()
        this.get(DepthTexture).generate(windowWidth, windowHeight)
        this.get(PickTexture).generate(windowWidth, windowHeight)
        this.getAllScene().forEach(scene => scene.getComponents(GLContainer).forEach(container => container.setRenderingContext(gl)));
        this.getAllScene().forEach(scene => scene.getComponents(TextureContainer).forEach(container => container.setTexture(this.get(DefaultTexture))));
        this.getAllScene().forEach(scene => scene.getComponents(SkinMesh).forEach(skinMesh => skinMesh.getEntity().get(TextureContainer).setTexture(this.get(JointTexture), TextureIndex.Joint)));
        this.getAllScene().forEach(scene => scene.getComponents(Text).forEach(text => text.getEntity().get(TextureContainer).setTexture(this.get(FontTexture))));
        this.getAllScene().forEach(scene => scene.getComponents(Flowers).forEach(comp => comp.getEntity().get(TextureContainer).setTexture(this.get(FlowerTexture))));
        this.getAllScene().forEach(scene => scene.getComponents(DepthMap).forEach(comp => comp.getEntity().get(TextureContainer).setTexture(this.get(DepthTexture))));
        this.getAllScene().forEach(scene => scene.getComponents(PickMap).forEach(comp => comp.getEntity().get(TextureContainer).setTexture(this.get(PickTexture))));
        
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
    getAllScene(): Scene[] {
        return this.getSceneManager().all();
    }
}