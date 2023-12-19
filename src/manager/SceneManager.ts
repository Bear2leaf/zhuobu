import AdrScene from "../scene/AdrScene.js";
import EmptyScene from "../scene/EmptyScene.js";
import GLTFScene from "../scene/GLTFScene.js";
import ViewPortChange from "../subject/ViewPortChange.js";
import EventManager from "./EventManager.js";

export default class SceneManager {
    private readonly adrScene = new AdrScene;
    private readonly adrNotificationScene = new AdrScene;
    private readonly adrEventScene = new AdrScene;
    private readonly tmpScene = new AdrScene;
    private readonly emptyScene = new EmptyScene;
    private readonly gltfScene = new GLTFScene;
    private viewPortChange?: ViewPortChange;
    constructor() {
        this.adrScene.addChild(this.adrNotificationScene);
        this.adrScene.addChild(this.adrEventScene);
        this.adrScene.addChild(this.tmpScene);
    }
    registerEntities(): void {
        this.gltfScene.registerEntities();
        this.adrNotificationScene.registerEntities();
        this.adrEventScene.registerEntities();
        this.adrScene.registerEntities();
        this.emptyScene.registerEntities();
        this.tmpScene.registerEntities();
    }
    initSceneEntities(): void {
        this.gltfScene.initEntities();
        this.adrNotificationScene.initEntities();
        this.adrEventScene.initEntities();
        this.adrScene.initEntities();
        this.emptyScene.initEntities();
        this.tmpScene.initEntities();
    }
    render(): void {
        this.viewPortChange?.notify();
        this.current().render();
    }
    current() {
        return this.adrScene;
    }
    getAdrEventScene() {
        return this.adrEventScene;
    }
    getTmpScene() {
        return this.tmpScene;
    }
    getAdrNotificationScene() {
        return this.adrNotificationScene;
    }
    getAdrScene() {
        return this.adrScene;
    }
    update() {
        this.gltfScene.update();
        this.tmpScene.update();
        this.adrNotificationScene.update();
        this.adrScene.update();
        this.adrEventScene.update();
        this.emptyScene.update();
    }
    initSubjects(eventManager: EventManager) {
        this.viewPortChange = eventManager.viewPortChange;
        this.tmpScene.setEntitySubjects(
            eventManager.entityInit,
            eventManager.entityAdd,
            eventManager.entityRegisterComponents,
            eventManager.entityRender,
            eventManager.entityUpdate,
            eventManager.entityRemove
        );

        this.adrEventScene.setEntitySubjects(
            eventManager.entityInit,
            eventManager.entityAdd,
            eventManager.entityRegisterComponents,
            eventManager.entityRender,
            eventManager.entityUpdate,
            eventManager.entityRemove
        );

        this.adrNotificationScene.setEntitySubjects(
            eventManager.entityInit,
            eventManager.entityAdd,
            eventManager.entityRegisterComponents,
            eventManager.entityRender,
            eventManager.entityUpdate,
            eventManager.entityRemove
        );

        this.gltfScene.setEntitySubjects(
            eventManager.entityInit,
            eventManager.entityAdd,
            eventManager.entityRegisterComponents,
            eventManager.entityRender,
            eventManager.entityUpdate,
            eventManager.entityRemove
        );
        this.adrScene.setEntitySubjects(
            eventManager.entityInit,
            eventManager.entityAdd,
            eventManager.entityRegisterComponents,
            eventManager.entityRender,
            eventManager.entityUpdate,
            eventManager.entityRemove
        );
        this.emptyScene.setEntitySubjects(
            eventManager.entityInit,
            eventManager.entityAdd,
            eventManager.entityRegisterComponents,
            eventManager.entityRender,
            eventManager.entityUpdate,
            eventManager.entityRemove
        );

    }
}