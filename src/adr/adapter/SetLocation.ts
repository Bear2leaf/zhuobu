import adr from "../adr.js";
import AdrAdapter from "./AdrAdapter.js";

export default class SetLocation extends AdrAdapter {
    init() {
        adr.setLocation = (location: string) => {
            // @ts-ignore
            window.location = location;
        }
    }

}