
import ExploreText from "../drawobject/ExploreText.js";
import Message from "../drawobject/Message.js";
import RestText from "../drawobject/RestText.js";
import Entity from "../entity/Entity.js";
import ExploreButtonObject from "../entity/ExploreButtonObject.js";
import HamburgerObject from "../entity/HamburgerObject.js";
import InformationObject from "../entity/InformationObject.js";
import MessageObject from "../entity/MessageObject.js";
import PointerObject from "../entity/PointerObject.js";
import ReflectMapObject from "../entity/ReflectMapObject.js";
import RenderMapObject from "../entity/RenderMapObject.js";
import RestButtonObject from "../entity/RestButtonObject.js";
import Scene from "./Scene.js";

export default class UIScene extends Scene {
    private hamburgerObject?: HamburgerObject;
    private messageObject?: MessageObject;
    private restButtonObject?: RestButtonObject;
    private exploreButtonObject?: ExploreButtonObject;
    private informationObject?: InformationObject;
    getDefaultEntities(): Entity[] {
        return [
            new PointerObject()
            , new HamburgerObject()
            , new RestButtonObject()
            , new ExploreButtonObject()
            , new InformationObject()
            , new MessageObject()
            // , new ReflectMapObject()
            // , new RenderMapObject()
        ];
    }
    collectPickDrawObject() {
        this.collectDrawObject((entity) =>
        entity instanceof MessageObject
        || entity instanceof RestButtonObject
        || entity instanceof ExploreButtonObject
        || entity instanceof InformationObject
        || false
        )
    }
    getMessageObject() {
        if (!this.messageObject) throw new Error("messageObject is not set!");
        return this.messageObject;
    }
    getRestButtonObject() {
        if (!this.restButtonObject) throw new Error("restButtonObject is not set!");
        return this.restButtonObject;
    }
    getInformationObject() {
        if (!this.informationObject) throw new Error("informationObject is not set!");
        return this.informationObject;
    }
    getExploreButtonObject() {
        if (!this.exploreButtonObject) throw new Error("exploreButtonObject is not set!");
        return this.exploreButtonObject;
    }
    getHamburgerObject() {
        if (!this.hamburgerObject) throw new Error("hamburgerObject is not set!");
        return this.hamburgerObject;
    }
    addEntity(entity: Entity): void {
        super.addEntity(entity);
        if (entity instanceof MessageObject) {
            this.messageObject = entity;
        } else if (entity instanceof RestButtonObject) {
            this.restButtonObject = entity;
        } else if (entity instanceof ExploreButtonObject) {
            this.exploreButtonObject = entity;
        } else if (entity instanceof InformationObject) {
            this.informationObject = entity;
        } else if (entity instanceof HamburgerObject) {
            this.hamburgerObject = entity;
        }
    }
    messagePicked(r: number, g: number, b: number) {
        const pickColor = this.getMessageObject().get(Message).getPickColor();
        if (r === pickColor.x && g === pickColor.y && b === pickColor.z) {
            return true;
        } else {
            return false;
        }
        
    }
    restPicked(r: number, g: number, b: number) {
        const pickColor = this.getRestButtonObject().get(RestText).getPickColor();
        if (r === pickColor.x && g === pickColor.y && b === pickColor.z) {
            return true;
        } else {
            return false;
        }
        
    }
    explorePicked(r: number, g: number, b: number) {
        const pickColor = this.getExploreButtonObject().get(ExploreText).getPickColor();
        if (r === pickColor.x && g === pickColor.y && b === pickColor.z) {
            return true;
        } else {
            return false;
        }
        
    }
}