import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class CreateElement implements AdrAdapter {
    init() {
        adr.createElement = (selector: string) => document.createElement(selector);
    }

}