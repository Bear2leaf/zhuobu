import TRS from "../component/TRS.js";
import Entity from "./Entity.js";

export default class PositionWithChildren extends Entity {
    constructor() {
        super()
        this.addComponent(new Node());
        this.addComponent(new TRS());
    }
}