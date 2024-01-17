
import DrawObject from "../drawobject/DrawObject.js";
import Message from "../drawobject/Message.js";
import Entity from "../entity/Entity.js";
import ExploreButtonObject from "../entity/ExploreButtonObject.js";
import FlowersObject from "../entity/FlowersObject.js";
import InformationObject from "../entity/InformationObject.js";
import MessageObject from "../entity/MessageObject.js";
import PointerObject from "../entity/PointerObject.js";
import ReflectMapObject from "../entity/ReflectMapObject.js";
import RenderMapObject from "../entity/RenderMapObject.js";
import RestButtonObject from "../entity/RestButtonObject.js";
import SpriteObject from "../entity/SpriteObject.js";
import Scene from "./Scene.js";

export default class UIScene extends Scene {
    private messageObject?: MessageObject;
    getDefaultEntities(): Entity[] {
        return [
            new RenderMapObject()
            , new ReflectMapObject()
            , new FlowersObject()
            , new PointerObject()
            , new SpriteObject()
            , new RestButtonObject()
            , new ExploreButtonObject()
            , new InformationObject()
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
    addEntity(entity: Entity): void {
        super.addEntity(entity);
        if (entity instanceof MessageObject) {
            this.messageObject = entity;
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
}