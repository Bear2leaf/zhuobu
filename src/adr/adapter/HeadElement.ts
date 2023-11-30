import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class HeadElement implements AdrAdapter {
    init() {
        adr.head = () => document.head;
    }

}