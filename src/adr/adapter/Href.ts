import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class Href implements AdrAdapter {
    init() {
        adr.href = (href?: string): void | string => {
            if (href) {
                document.location.href = href;
            } else {
                return document.location.href;
            }
        }
    }

}