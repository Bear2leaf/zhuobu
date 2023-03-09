import Cone from "../geometry/Cone.js";
import DrawObject from "./DrawObject.js";

export default class BlackWireCone extends DrawObject {
    constructor() {
        const cube = new Cone();
        super(cube.colors, cube.indices, cube.vertices);
    }
}

