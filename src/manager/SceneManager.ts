import UIScene from "../scene/UIScene.js";
import GLTFScene from "../scene/GLTFScene.js";
import EventManager from "./EventManager.js";
import Scene from "../scene/Scene.js";
import MessageObject from "../entity/MessageObject.js";
import SDFCharacter from "../drawobject/SDFCharacter.js";
import TRS from "../transform/TRS.js";
import Node from "../transform/Node.js";
import InitScene from "../scene/InitScene.js";
import Border from "../drawobject/Border.js";
import InformationText from "../drawobject/InformationText.js";
import InformationObject from "../entity/InformationObject.js";
import Message from "../drawobject/Message.js";

export default class SceneManager {
    private readonly uiScene = new UIScene;
    private readonly gltfScene = new GLTFScene;
    private readonly emptyScene = new InitScene;
    private current: Scene = this.emptyScene;
    private backup: Scene = this.emptyScene;
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
        this.backup.collectDrawObject();
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
        if (this.uiScene === this.backup) {
            // this.backup = this.emptyScene;
        } else {
            this.backup = this.uiScene;
        }
    }
    addMessage(message: string) {
        const object = this.uiScene.getInformationObject();
        object.get(InformationText).updateChars(`${message}`);
        object.get(Border).create();
    }
    updateStatus(message: string) {
        const object = this.uiScene.getMessageObject();
        object.get(Message).updateChars(`${message}`);
        object.get(TRS).getPosition().set(0, object.get(SDFCharacter).getOffsetHeight(), 0);
        object.get(Node).updateWorldMatrix();
        object.get(Border).create();
    }
    getInformationObject(): InformationObject {
        return this.uiScene.getInformationObject();
    }
    loadInitScene() {
        if (this.messageObject) {
            this.uiScene.removeEntity(this.messageObject);
            this.messageObject = undefined;
        }
        this.current = this.gltfScene;
    }
    createMessageUI() {
        const object = new MessageObject();
        object.addDefaultComponents();
        this.uiScene.registerComponents(object);
        this.uiScene.initEntity(object);
        this.uiScene.addEntity(object);
        const chars = "Hello World! abc.\n123\n456";
        object.get(SDFCharacter).updateChars(chars);
        object.get(Border).create();
        object.get(TRS).getPosition().set(0, object.get(SDFCharacter).getOffsetHeight(), 0);
        object.get(Node).updateWorldMatrix();
        this.messageObject = object;
    }
    update() {
        this.emptyScene.update();
        this.gltfScene.update();
        this.uiScene.update();
    }
    initObservers() {
        const eventManager = this.getEventManager();
        eventManager.clickPick.setUIScene(this.uiScene);
        eventManager.workerMessage.setSceneManager(this);
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