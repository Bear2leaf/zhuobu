import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class GetElementsByClassName implements AdrAdapter {
    init() {
        adr.getElementsByClassName = (selector: string) => document.getElementsByClassName(selector);
    }

}