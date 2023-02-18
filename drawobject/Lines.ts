import Mesh from "../geometry/Mesh.js";
import { Vec4 } from "../math/Vector.js";
import DrawObject from "./DrawObject.js";

export default class Lines extends DrawObject {
    constructor(mesh: Mesh) {
        super()
        this.setVertices(mesh.vertices)
        this.setIndices(mesh.lineIndices)
        this.setColors(mesh.vertices.map(() => new Vec4(0, 0, 0, 1)));
    }
}