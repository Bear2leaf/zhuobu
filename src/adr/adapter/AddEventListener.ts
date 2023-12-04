import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class AddEventListener extends AdrAdapter {
    init() {
        adr.addEventListener = (eventName: string, resumeAudioContext: () => void) => {
            document.addEventListener(eventName, resumeAudioContext);
        };
    }

}