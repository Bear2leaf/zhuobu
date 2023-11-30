import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class GetElementById implements AdrAdapter {
    init() {
        adr.getElementById = (selector: string) => document.getElementById(selector);
    }

}