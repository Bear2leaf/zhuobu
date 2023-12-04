import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class ClearTimeout extends AdrAdapter {
    init() {
        adr.clearTimeout = function (id?: number) { return clearTimeout.apply(window, [id]) }
    }

}