import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class GetElementsByTagName extends AdrAdapter {
    init() {
        adr.getElementsByTagName = (selector: string) => document.getElementsByTagName(selector);
    }

}