import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class LocalStorageAdapter extends AdrAdapter {
    init() {
        adr.localStorage = () => ({
            gameState: undefined,
            lang: undefined,
            clear: () => {
                localStorage.gameState = undefined;
                localStorage.lang = undefined;
            }
        });
    }

}