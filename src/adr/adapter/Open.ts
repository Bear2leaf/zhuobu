import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class Open extends AdrAdapter {
    init() {
        adr.open = (url?: string | URL, target?: string, features?: string) => {
            window.open(url, target, features);
        }
    }

}