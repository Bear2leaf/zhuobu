import { Vec4 } from "../math/Vector.js";
import DrawObject from "./DrawObject.js";

export default class WaveFrontObj extends DrawObject {
    constructor() {
        const colors: Vec4[] = [];
        const indices: number[] = [];
        const vertices: Vec4[] = [];
        
        super(colors, indices, vertices);
    }
}

