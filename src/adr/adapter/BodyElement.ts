import Node from "../../transform/Node.js";
import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class BodyElement extends AdrAdapter {
    init() {
        adr.body = () => document.body;
        const body = this.getEntity();
        const root = this.getRoot();
        body.get(Node).setParent(root.get(Node));
    }

}