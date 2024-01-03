import UIScene from "../scene/UIScene.js";
import GLTFScene from "../scene/GLTFScene.js";
import ViewPortChange from "../subject/ViewPortChange.js";
import EventManager from "./EventManager.js";
import Scene from "../scene/Scene.js";

export default class SceneManager {
    private readonly uiScene = new UIScene;
    private readonly gltfScene = new GLTFScene;
    private current: Scene = this.gltfScene;
    private viewPortChange?: ViewPortChange;
    registerEntities(): void {
        this.gltfScene.registerEntities();
        this.uiScene.registerEntities();
    }
    initSceneEntities(): void {
        this.gltfScene.initEntities();
        this.uiScene.initEntities();
    }
    collectDrawObject(): void {
        this.current.collectDrawObject();
    }
    collectRefractFramebufferObject() {
        this.gltfScene.collectRefractDrawObject();
    }
    collectReflectFramebufferObject() {
        this.gltfScene.collectReflectDrawObject();
    }
    collectPickFramebufferObject() {
        this.gltfScene.collectPickDrawObject();
    }
    collectDepthFramebufferObject() {
        this.gltfScene.collectDepthDrawObject();
    }
    toggleUIScene() {
        if (this.uiScene === this.current) {
            this.current = this.gltfScene;
        } else {
            this.current = this.uiScene;
        }
    }
    update() {
        this.gltfScene.update();
        this.uiScene.update();
    }
    initSubjects(eventManager: EventManager) {
        this.viewPortChange = eventManager.viewPortChange;
        this.gltfScene.setEntitySubjects(
            eventManager.entityInit,
            eventManager.entityAdd,
            eventManager.entityRegisterComponents,
            eventManager.entityRender,
            eventManager.entityUpdate,
            eventManager.entityRemove
        );
        this.uiScene.setEntitySubjects(
            eventManager.entityInit,
            eventManager.entityAdd,
            eventManager.entityRegisterComponents,
            eventManager.entityRender,
            eventManager.entityUpdate,
            eventManager.entityRemove
        );

    }
}