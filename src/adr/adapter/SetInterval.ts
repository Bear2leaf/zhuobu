import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class SetInterval extends AdrAdapter {
    init() {
        adr.setInterval =  function (handler: TimerHandler, timeout?: number | undefined, ...args: any[]) { return setInterval.apply(window, [handler, timeout, ...args]) };
    }

}