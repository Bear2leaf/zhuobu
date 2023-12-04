import AdrElementObject from "../../entity/AdrElementObject.js";
import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class CreateElement extends AdrAdapter {
    init() {
        adr.createElement = (selector: string) => {
            // const entity = new AdrElementObject();
            // entity.registerComponents();
            // this.getSceneManager().first().addEntity(entity);
            return document.createElement(selector);

        };
    }

}