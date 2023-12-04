import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class Title extends AdrAdapter {
    init() {
        adr.title = (title?: string): void | string => {
            if (title) {
                document.title = title;
            } else {
                return document.title;
            }
        };
    }

}