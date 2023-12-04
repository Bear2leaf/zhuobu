import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class RemoveEventListener extends AdrAdapter {
    init() {
        adr.removeEventListener = (eventName: string, resumeAudioContext: () => void) => {
            document.removeEventListener(eventName, resumeAudioContext);
        };
    }

}