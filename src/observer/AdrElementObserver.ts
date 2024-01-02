import ScriptManager from "../manager/ScriptManager.js";
import Observer from "./Observer.js";

export default class AdrElementObserver extends Observer {
    private adrManager?: ScriptManager;
    setAdrManager(adrManager: ScriptManager) {
        this.adrManager = adrManager;
    }
    getAdrManager() {
        if (this.adrManager === undefined) throw new Error("AdrManager is undefined");
        return this.adrManager;
    }
}