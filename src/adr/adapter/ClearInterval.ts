import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class ClearInterval extends AdrAdapter {
    init() {
        adr.clearInterval = function (id?: number) { return clearInterval.apply(window, [id]) };
    }

}