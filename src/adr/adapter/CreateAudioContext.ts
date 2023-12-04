import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class CreateAudioContext extends AdrAdapter {
    init() {
        adr.createAudioContext = function () {
            return new AudioContext();
        }
    }

}