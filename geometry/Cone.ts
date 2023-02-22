import { Vec4 } from "../math/Vector.js";
import Mesh from "./Mesh.js";

export default class Cone implements Mesh {
    private readonly tip: Vec4;
    private readonly tr: Vec4;
    private readonly br: Vec4;
    private readonly bl: Vec4;
    private readonly tl: Vec4;
    readonly colors: readonly Vec4[];
    readonly indices: readonly number[];
    readonly vertices: readonly Vec4[];
    constructor() {
        this.tip = new Vec4(0, 0, 1, 1);
        this.tr = new Vec4(1, 1, -1, 1);
        this.br = new Vec4(1, -1, -1, 1);
        this.bl = new Vec4(-1, -1, -1, 1);
        this.tl = new Vec4(-1, 1, -1, 1);
        this.colors = [
            new Vec4(0, 0, 0, 1),
            new Vec4(0, 0, 0, 1),
            new Vec4(0, 0, 0, 1),
            new Vec4(0, 0, 0, 1),
            new Vec4(0, 0, 0, 1),
        ]
        this.vertices = [
            this.tip, this.tr, this.br, this.bl, this.tl
        ];
        this.indices = [
            0, 1,
            0, 2,
            0, 3,
            0, 4,
            1, 2,
            2, 3,
            3, 4,
            4, 1
        ];
    }


}