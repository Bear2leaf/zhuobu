import Quad from "../geometry/Quad.js";
import DrawObject from "./DrawObject.js";

export default class Histogram extends DrawObject {

    constructor() {
        const quad = new Quad(0, 0, 100, 100);
        super(quad.colors, quad.indices, quad.vertices);
        console.log(this)
    }
}

