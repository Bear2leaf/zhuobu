import AdrScene from "../scene/AdrScene.js";
import EmptyScene from "../scene/EmptyScene.js";
import GLTFScene from "../scene/GLTFScene.js";
import EventManager from "./EventManager.js";

export default class SceneManager {
    private readonly adrScene = new AdrScene;
    private readonly emptyScene = new EmptyScene;
    private readonly gltfScene = new GLTFScene;
    registerEntities(): void {
        this.gltfScene.registerEntities();
        this.adrScene.registerEntities();
        this.emptyScene.registerEntities();
    }
    initSceneEntities(): void {
        this.gltfScene.initEntities();
        this.adrScene.initEntities();
        this.emptyScene.initEntities();
    }
    render(): void {
        this.current().render();
    }
    current() {
        return this.gltfScene;
    }
    getAdrScene() {
        return this.adrScene;
    }
    update() {
        this.current().update();
    }
    initSubjects(eventManager: EventManager) {

        this.gltfScene.setEntitySubjects(
            eventManager.viewPortChange,
            eventManager.entityInit,
            eventManager.entityAdd,
            eventManager.entityRegisterComponents,
            eventManager.entityRender,
            eventManager.entityUpdate,
            eventManager.entityRemove
        );
        this.adrScene.setEntitySubjects(
            eventManager.viewPortChange,
            eventManager.entityInit,
            eventManager.entityAdd,
            eventManager.entityRegisterComponents,
            eventManager.entityRender,
            eventManager.entityUpdate,
            eventManager.entityRemove
        );
        this.emptyScene.setEntitySubjects(
            eventManager.viewPortChange,
            eventManager.entityInit,
            eventManager.entityAdd,
            eventManager.entityRegisterComponents,
            eventManager.entityRender,
            eventManager.entityUpdate,
            eventManager.entityRemove
        );

    }
}