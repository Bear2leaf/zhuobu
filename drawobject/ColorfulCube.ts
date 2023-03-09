import Cube, { PrimitiveType } from "../geometry/Cube.js";
import DrawObject from "./DrawObject.js";

export default class ColorfulCube extends DrawObject {
    constructor() {
        const cube = new Cube(PrimitiveType.TRIANGLES);
        super(cube.colors, cube.indices, cube.vertices);
    }
}

