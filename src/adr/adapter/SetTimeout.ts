import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class SetTimeout extends AdrAdapter {
    init() {
        adr.setTimeout = function (handler: TimerHandler, timeout?: number | undefined, ...args: any[]) { return setTimeout.apply(window, [handler, timeout, ...args]) }
    }

}