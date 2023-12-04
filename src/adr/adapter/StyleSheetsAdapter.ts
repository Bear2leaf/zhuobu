import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class StyleSheetsAdapter extends AdrAdapter {
    init() {
        adr.styleSheets = () => document.styleSheets;
    }

}