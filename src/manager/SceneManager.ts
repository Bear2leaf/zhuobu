import UIScene from "../scene/UIScene.js";
import IslandScene from "../scene/IslandScene.js";
import EventManager from "./EventManager.js";
import Border from "../drawobject/Border.js";
import InformationText from "../drawobject/InformationText.js";
import InformationObject from "../entity/InformationObject.js";
import Message from "../drawobject/Message.js";
import Hamburger from "../layout/Hamburger.js";
import EnvironmentScene from "../scene/EnvironmentScene.js";

export default class SceneManager {
    private readonly uiScene = new UIScene;
    private readonly islandScene = new IslandScene;
    private readonly environmentScene = new EnvironmentScene;
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
        this.islandScene.registerEntities();
        this.uiScene.registerEntities();
        this.environmentScene.registerEntities();
    }
    initSceneEntities(): void {
        this.islandScene.initEntities();
        this.uiScene.initEntities();
        this.environmentScene.initEntities();
        this.getEventManager().uiLayout.notify();
    }
    collectDrawObject(): void {
        this.islandScene.collectDrawObject();
        this.environmentScene.collectDrawObject();
        this.uiScene.collectDrawObject();
    }
    collectRefractFramebufferObject() {
        this.islandScene.collectRefractDrawObject();
        this.environmentScene.collectRefractDrawObject();
    }
    collectReflectFramebufferObject() {
        this.islandScene.collectReflectDrawObject();
        this.environmentScene.collectReflectDrawObject();
    }
    collectPickFramebufferObject() {
        this.uiScene.collectPickDrawObject();
    }
    collectDepthFramebufferObject() {
        this.islandScene.collectDepthDrawObject();
        this.environmentScene.collectDepthDrawObject();
    }
    toggleUIScene() {
        console.log("toggleUIScene");
    }
    addMessage(message: string) {
        const object = this.uiScene.getInformationObject();
        object.get(InformationText).updateChars(`${message}`);
        object.get(Border).createFromSDFCharacter();
        this.uiScene.getHamburgerObject().get(Hamburger).layout();
    }
    updateStatus(message: string) {
        const object = this.uiScene.getMessageObject();
        object.get(Message).updateChars(`${message}`);
        object.get(Border).createFromSDFCharacter();
        this.uiScene.getHamburgerObject().get(Hamburger).layout();
    }
    getInformationObject(): InformationObject {
        return this.uiScene.getInformationObject();
    }
    loadInitScene() {
        console.log("loadInitScene");
    }
    createMessageUI() {
        console.log("createMessageUI");
    }
    update() {
        this.islandScene.update();
        this.environmentScene.update();
        this.uiScene.update();
    }
    initObservers() {
        const eventManager = this.getEventManager();
        eventManager.clickPick.setUIScene(this.uiScene);
        eventManager.workerMessage.setSceneManager(this);
        eventManager.uiLayout.setUIScene(this.uiScene);
    }
    initSubjects() {
        const eventManager = this.getEventManager();
        this.islandScene.setEntitySubjects(
            eventManager.entityInit,
            eventManager.entityAdd,
            eventManager.entityRegisterComponents,
            eventManager.entityRender,
            eventManager.entityUpdate,
            eventManager.entityRemove
        );
        this.environmentScene.setEntitySubjects(
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