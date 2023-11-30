import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class CreateAudioContext implements AdrAdapter {
    init() {
        adr.createAudioContext = function () {
            return new AudioContext();
        }
    }

}