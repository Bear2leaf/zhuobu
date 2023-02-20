import Matrix from "../math/Matrix.js";
import Mesh from "../geometry/Mesh.js";

export default class DrawObject {
    mesh?: Mesh;
    readonly worldMatrix: Matrix;
    constructor(mesh?: Mesh) {
        this.mesh = mesh;
        this.worldMatrix = Matrix.identity();
    }
}