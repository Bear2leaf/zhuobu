import TextCache from "../cache/TextCache.js";
import { PerspectiveCamera } from "../camera/PerspectiveCamera.js";
import TouchEventContainer from "../component/TouchEventContainer.js";
import Renderer from "../renderer/Renderer.js";
import DemoScene from "../scene/DemoScene.js";
import Scene from "../scene/Scene.js";
import CacheManager from "./CacheManager.js";
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

        this.add(DemoScene);
        this.get(DemoScene).init();
        this.get(DemoScene).getComponents(Renderer).forEach(renderer => renderer.setCamera(this.getCameraManager().get(PerspectiveCamera)));
        
        console.log("SceneManager init");
    }
    update(): void {
        this.get(DemoScene).update();
    }

}