import EmptyScene from "../scene/EmptyScene.js";
import GLTFScene from "../scene/GLTFScene.js";
import ViewPortChange from "../subject/ViewPortChange.js";
import EventManager from "./EventManager.js";

export default class SceneManager {
    private readonly uiScene = new EmptyScene;
    private readonly gltfScene = new GLTFScene;
    private current = this.gltfScene;
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
        this.viewPortChange?.notify();
        this.current.collectDrawObject();
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