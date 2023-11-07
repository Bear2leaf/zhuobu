import DepthMap from "../texturemap/DepthMap.js";
import Flowers from "../texturemap/Flowers.js";
import GLContainer from "../container/GLContainer.js";
import SkinMesh from "../drawobject/SkinMesh.js";
import Text from "../drawobject/Text.js";
import Scene from "../scene/Scene.js";
import DefaultTexture from "../texture/DefaultTexture.js";
import DepthTexture from "../texture/DepthTexture.js";
import FlowerTexture from "../texture/FlowerTexture.js";
import FontTexture from "../texture/FontTexture.js";
import JointTexture from "../texture/JointTexture.js";
import PickTexture from "../texture/PickTexture.js";
import RenderTexture from "../texture/RenderTexture.js";
import Texture, { TextureIndex } from "../texture/Texture.js";
import CacheManager from "./CacheManager.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";
import PickMap from "../texturemap/PickMap.js";
import TextureContainer from "../container/TextureContainer.js";
import SingleColorTexture from "../texture/SingleColorTexture.js";
import SingleColorCanvasMap from "../texturemap/SingleColorCanvasMap.js";
import SDFCanvasMap from "../texturemap/SDFCanvasMap.js";
import SDFTexture from "../texture/SDFTexture.js";


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
            RenderTexture,
            SingleColorTexture,
            SDFTexture,
        ].forEach((ctor) => {
            this.add<Texture>(ctor);
        });
    }
    async load(): Promise<void> {
        
        await this.getCacheManager().loadImageCache("flowers");
        await this.getCacheManager().loadFontCache("boxy_bold_font");
    }
    init(): void {
        
        const context = this.getDevice().getRenderingContext();
        const offscreenCanvasContext = this.getDevice().getOffscreenCanvasRenderingContext();
        const sdfCanvasContext = this.getDevice().getSDFCanvasRenderingContext();
        this.get(FontTexture).setFontImage(this.getCacheManager().getImage("boxy_bold_font"));
        this.get(FlowerTexture).setImage(this.getCacheManager().getImage("flowers"));
        this.all().forEach(texture => texture.create(context));
        this.get(SingleColorTexture).setCanvasContext(offscreenCanvasContext);
        this.get(SDFTexture).setCanvasContext(sdfCanvasContext);
        const { windowWidth, windowHeight, pixelRatio } = this.getDevice().getWindowInfo()
        this.get(DepthTexture).generate(windowWidth * pixelRatio, windowHeight * pixelRatio)
        this.get(PickTexture).generate(windowWidth * pixelRatio, windowHeight * pixelRatio)
        this.get(RenderTexture).generate(windowWidth * pixelRatio, windowHeight * pixelRatio)
        this.get(SingleColorTexture).generate(windowWidth * pixelRatio, windowHeight * pixelRatio)
        this.get(SDFTexture).generate(windowWidth * pixelRatio, windowHeight * pixelRatio)
        this.getSceneManager().all().forEach(scene => scene.getComponents(GLContainer).forEach(container => container.setRenderingContext(context)));
        this.getSceneManager().all().forEach(scene => scene.getComponents(TextureContainer).forEach(container => container.setTexture(this.get(DefaultTexture))));
        this.getSceneManager().all().forEach(scene => scene.getComponents(SkinMesh).forEach(skinMesh => skinMesh.getEntity().get(TextureContainer).setTexture(this.get(JointTexture), TextureIndex.Joint)));
        this.getSceneManager().all().forEach(scene => scene.getComponents(Text).forEach(text => text.getEntity().get(TextureContainer).setTexture(this.get(FontTexture))));
        this.getSceneManager().all().forEach(scene => scene.getComponents(Flowers).forEach(comp => comp.getEntity().get(TextureContainer).setTexture(this.get(FlowerTexture))));
        this.getSceneManager().all().forEach(scene => scene.getComponents(DepthMap).forEach(comp => comp.getEntity().get(TextureContainer).setTexture(this.get(DepthTexture))));
        this.getSceneManager().all().forEach(scene => scene.getComponents(PickMap).forEach(comp => comp.getEntity().get(TextureContainer).setTexture(this.get(PickTexture))));
        this.getSceneManager().all().forEach(scene => scene.getComponents(SingleColorCanvasMap).forEach(comp => comp.getEntity().get(TextureContainer).setTexture(this.get(SingleColorTexture))));
        this.getSceneManager().all().forEach(scene => scene.getComponents(SDFCanvasMap).forEach(comp => comp.getEntity().get(TextureContainer).setTexture(this.get(SDFTexture))));
        
    }
    update(): void {
        this.get(SingleColorTexture).generate(300, 150)
        this.get(SDFTexture).generate(300, 150)
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