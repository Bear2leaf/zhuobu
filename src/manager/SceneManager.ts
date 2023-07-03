import { OrthoCamera } from "../camera/OrthoCamera.js";
import { PerspectiveCamera } from "../camera/PerspectiveCamera.js";
import GLContainer from "../component/GLContainer.js";
import TextureContainer from "../component/TextureContainer.js";
import TouchEventContainer from "../component/TouchEventContainer.js";
import Renderer from "../renderer/Renderer.js";
import DemoScene from "../scene/DemoScene.js";
import Scene from "../scene/Scene.js";
import { TextureIndex } from "../texture/Texture.js";
import CameraManager from "./CameraManager.js";
import Manager from "./Manager.js";

export default class SceneManager extends Manager<Scene> {
    private cameraManager?: CameraManager;

    getCurrentTouchEventContainerComponents() {
        return this.get(DemoScene).getComponents(TouchEventContainer);
    }
    setCameraManager(cameraManager: CameraManager) {
        this.cameraManager = cameraManager;
    }
    getCameraManager(): CameraManager {
        if (this.cameraManager === undefined) { 
            throw new Error("cameraManager is undefined");
        }
        return this.cameraManager;
    }
    init(): void {
        const gl = this.getDevice().gl;
        const defaultTexture = gl.makeTexture(TextureIndex.Default);
        defaultTexture.generate(2, 2, new Float32Array([1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1]));
        this.add(DemoScene);
        this.get(DemoScene).registerEntities();
        this.get(DemoScene).getComponents(GLContainer).forEach(container => container.setRenderingContext(gl));
        this.get(DemoScene).getComponents(TextureContainer).forEach(container => container.setTexture(defaultTexture));

        this.get(DemoScene).initEntities();
        this.get(DemoScene).getComponents(Renderer).forEach(renderer => renderer.setCamera(this.getCameraManager().get(OrthoCamera)));
        
        console.log("SceneManager init");
    }
    update(): void {
        this.get(DemoScene).update();
    }

}