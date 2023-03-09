import Cube from "../geometry/Cube.js";
import DrawObject from "./DrawObject.js";

export default class BlackWireCube extends DrawObject {
    constructor() {
        const cube = new Cube();
        super(cube.colors, cube.indices, cube.vertices);
    }
}

