import Node from "../../transform/Node.js";
import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class HeadElement extends AdrAdapter {
    init() {
        adr.head = () => document.head;
        const head = this.getEntity();
        const root = this.getRoot();
        head.get(Node).setParent(root.get(Node));
    }

}