import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class AddEventListener implements AdrAdapter {
    init() {
        adr.addEventListener = (eventName: string, resumeAudioContext: () => void) => {
            document.addEventListener(eventName, resumeAudioContext);
        };
    }

}