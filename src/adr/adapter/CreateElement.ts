import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class CreateElement extends AdrAdapter {
    init() {
        adr.createElement = (selector: string) => document.createElement(selector);
    }

}