import { Vec4 } from "../math/Vector.js";

export default class Mesh {
    readonly colors: readonly Vec4[];
    readonly indices: readonly number[];
    readonly vertices: readonly Vec4[];
    constructor(colors: readonly Vec4[], indices: readonly number[], vertices: readonly Vec4[]) {
        this.colors = colors;
        this.indices = indices;
        this.vertices = vertices;
    }
}