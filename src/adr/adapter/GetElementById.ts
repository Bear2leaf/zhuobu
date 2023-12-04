import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class GetElementById extends AdrAdapter {
    init() {
        adr.getElementById = (selector: string) => document.getElementById(selector);
    }

}