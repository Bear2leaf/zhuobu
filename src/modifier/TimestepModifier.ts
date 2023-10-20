import Modifier from "./Modifier.js";

export default class TimestepModifier implements Modifier {
    private info = "";
    updateTimestepInfo(info: string) {
        this.info = info;
    }
    getTimestepInfo() {
        return this.info;
    }
    
}