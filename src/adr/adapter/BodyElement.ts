import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class BodyElement extends AdrAdapter {
    init() {
        adr.body = () => document.body;
    }

}