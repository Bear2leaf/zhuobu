import AdrManager from "../manager/AdrManager.js";
import Observer from "./Observer.js";

export default class AdrElementObserver extends Observer {
    private adrManager?: AdrManager;
    setAdrManager(adrManager: AdrManager) {
        this.adrManager = adrManager;
    }
    getAdrManager() {
        if (this.adrManager === undefined) throw new Error("AdrManager is undefined");
        return this.adrManager;
    }
}