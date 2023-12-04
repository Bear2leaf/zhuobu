import AdrHeadText from "../../drawobject/AdrHeadText.js";
import AdrRoot from "../../drawobject/AdrRoot.js";
import Node from "../../transform/Node.js";
import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class HeadElement extends AdrAdapter {
    init() {
        adr.head = () => document.head;
        const head = this.getSceneManager()
            .first().getComponents(AdrHeadText)[0]?.getEntity();
        const root = this.getSceneManager()
            .first().getComponents(AdrRoot)[0]?.getEntity();
        if (!root || !head) {
            throw new Error("AdrRootObject or AdrHeadObject not found");
        }
        head.get(Node).setParent(root.get(Node));
    }

}