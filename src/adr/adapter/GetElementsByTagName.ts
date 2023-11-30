import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class GetElementsByTagName implements AdrAdapter {
    init() {
        adr.getElementsByTagName = (selector: string) => document.getElementsByTagName(selector);
    }

}