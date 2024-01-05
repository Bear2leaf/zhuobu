import UIScene from "../scene/UIScene.js";
import GLTFScene from "../scene/GLTFScene.js";
import EventManager from "./EventManager.js";
import Scene from "../scene/Scene.js";
import MessageObject from "../entity/MessageObject.js";
import SDFCharacter from "../drawobject/SDFCharacter.js";
import TRS from "../transform/TRS.js";
import Node from "../transform/Node.js";

export default class SceneManager {
    private readonly uiScene = new UIScene;
    private readonly gltfScene = new GLTFScene;
    private current: Scene = this.gltfScene;
    private eventManager?: EventManager;
    getEventManager(): EventManager {
        if (this.eventManager === undefined) {
            throw new Error("eventManager is undefined");
        }
        return this.eventManager;
    }
    setEventManager(eventManager: EventManager) {
        this.eventManager = eventManager;
    }
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
        this.uiScene.collectPickDrawObject();
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
    createMessageUI() {
        const object = new MessageObject();
        object.addDefaultComponents();
        this.uiScene.registerComponents(object);
        this.uiScene.initEntity(object);
        this.uiScene.addEntity(object);
        object.get(TRS).getScale().set(0.05, 0.05, 0.05);
        object.get(TRS).getPosition().set(-5, 0, 0);
        object.get(Node).updateWorldMatrix();
        object.get(SDFCharacter).updateChars("Hello World!");
    }
    update() {
        this.gltfScene.update();
        this.uiScene.update();
    }
    initObservers() {
        const eventManager = this.getEventManager();
        eventManager.onWorkerMessage.setSceneManager(this);
    }
    initSubjects() {
        const eventManager = this.getEventManager();
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