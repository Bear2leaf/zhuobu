import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class SetLocation implements AdrAdapter {
    init() {
        adr.setLocation = (location: string) => {
            // @ts-ignore
            window.location = location;
        }
    }

}