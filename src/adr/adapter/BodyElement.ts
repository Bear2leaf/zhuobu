import AdrBodyText from "../../drawobject/AdrBodyText.js";
import AdrRoot from "../../drawobject/AdrRoot.js";
import Node from "../../transform/Node.js";
import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class BodyElement extends AdrAdapter {
    init() {
        adr.body = () => document.body;
        const body = this.getSceneManager()
            .first().getComponents(AdrBodyText)[0]?.getEntity();
        const root = this.getSceneManager()
            .first().getComponents(AdrRoot)[0]?.getEntity();
        if (!root || !body) {
            throw new Error("AdrRootObject or AdrHeadObject not found");
        }
        body.get(Node).setParent(root.get(Node));
    }

}