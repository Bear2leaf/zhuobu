import Mesh from "../geometry/Mesh.js";
import DrawObject from "./DrawObject.js";

export default class Triangles extends DrawObject {
    constructor(mesh: Mesh) {
        super()
        this.setVertices(mesh.vertices)
        this.setIndices(mesh.triangleIndices)
        this.setColors(mesh.colors)
    }
}