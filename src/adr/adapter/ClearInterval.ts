import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class ClearInterval implements AdrAdapter {
    init() {
        adr.clearInterval = function (id?: number) { return clearInterval.apply(window, [id]) };
    }

}