import AdrElementObject from "../../entity/AdrElementObject.js";
import Node from "../../transform/Node.js";
import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class CreateElement extends AdrAdapter {
    init() {
        adr.createElement = (selector: string) => {
            const entity = new AdrElementObject();
            const scene = this.getSceneManager().first();
            scene.addEntity(entity);
            scene.registerComponents(entity);
            scene.initEntity(entity);
            entity.get(Node).setParent(this.getRoot().get(Node))
            return document.createElement(selector);
        };
    }

}