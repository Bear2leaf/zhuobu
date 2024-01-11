import UIScene from "../scene/UIScene.js";
import GLTFScene from "../scene/GLTFScene.js";
import EventManager from "./EventManager.js";
import Scene from "../scene/Scene.js";
import MessageObject from "../entity/MessageObject.js";
import SDFCharacter from "../drawobject/SDFCharacter.js";
import TRS from "../transform/TRS.js";
import Node from "../transform/Node.js";
import InitScene from "../scene/InitScene.js";

export default class SceneManager {
    private readonly uiScene = new UIScene;
    private readonly gltfScene = new GLTFScene;
    private readonly emptyScene = new InitScene;
    private current: Scene = this.emptyScene;
    private eventManager?: EventManager;
    private messageObject?: MessageObject
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
        this.emptyScene.registerEntities();
        this.gltfScene.registerEntities();
        this.uiScene.registerEntities();
    }
    initSceneEntities(): void {
        this.emptyScene.initEntities();
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
    addMessage(message: string) {
        this.getMessageObject().get(SDFCharacter).appendChars(`\n${message}`);
    }
    getMessageObject(): MessageObject {
        if (this.messageObject === undefined) {
            throw new Error("messageObject is undefined");
        }
        return this.messageObject;
    }
    loadInitScene() {
        if (this.messageObject) {
            this.uiScene.removeEntity(this.getMessageObject());
        }
        this.current = this.gltfScene;
    }
    createMessageUI() {
        const object = new MessageObject();
        object.addDefaultComponents();
        this.uiScene.registerComponents(object);
        this.uiScene.initEntity(object);
        this.uiScene.addEntity(object);
        object.get(TRS).getScale().set(0.05, 0.05, 0.05);
        object.get(TRS).getPosition().set(-6, 0, 0);
        object.get(Node).updateWorldMatrix();
        object.get(SDFCharacter).updateChars("Hello World! abc.\n123\n456");
        this.messageObject = object;
    }
    update() {
        this.emptyScene.update();
        this.gltfScene.update();
        this.uiScene.update();
    }
    initObservers() {
        const eventManager = this.getEventManager();
        eventManager.onWorkerMessage.setSceneManager(this);
    }
    initSubjects() {
        const eventManager = this.getEventManager();
        this.emptyScene.setEntitySubjects(
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