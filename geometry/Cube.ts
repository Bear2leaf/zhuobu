import { Vec4 } from "../math/Vector.js";
import Mesh from "./Mesh.js";

export default class Cube implements Mesh {
    private readonly p0: Vec4;
    private readonly p1: Vec4;
    private readonly p2: Vec4;
    private readonly p3: Vec4;
    private readonly p4: Vec4;
    private readonly p5: Vec4;
    private readonly p6: Vec4;
    private readonly p7: Vec4;

    constructor() {
        this.p0 = new Vec4(-1, -1, -1, 1);  // cube vertices
        this.p1 = new Vec4(1, -1, -1, 1);
        this.p2 = new Vec4(-1, 1, -1, 1);
        this.p3 = new Vec4(1, 1, -1, 1);
        this.p4 = new Vec4(-1, -1, 1, 1);
        this.p5 = new Vec4(1, -1, 1, 1);
        this.p6 = new Vec4(-1, 1, 1, 1);
        this.p7 = new Vec4(1, 1, 1, 1);
    }
    get colors(): Vec4[] {
        return [
            new Vec4(1, 0, 0, 1), // red
            new Vec4(0, 1, 0, 1), // green
            new Vec4(0, 0, 1, 1), // blue
            new Vec4(1, 1, 0, 1), // yellow
            new Vec4(1, 0, 1, 1), // magenta
            new Vec4(0, 1, 1, 1), // cyan
            new Vec4(1, 1, 1, 1), // white
            new Vec4(0, 0, 0, 1), // black
        ]
    }
    
    get vertices(): [Vec4, Vec4, Vec4, Vec4, Vec4, Vec4, Vec4, Vec4] {
        return [this.p0, this.p1, this.p2, this.p3, this.p4, this.p5, this.p6, this.p7];
    }
    
    get aToBIndices(): [number, number] { return [this.vertices.indexOf(this.p0), this.vertices.indexOf(this.p1)] }
    get aToCIndices(): [number, number] { return [this.vertices.indexOf(this.p0), this.vertices.indexOf(this.p2)] }
    get aToEIndices(): [number, number] { return [this.vertices.indexOf(this.p0), this.vertices.indexOf(this.p4)] }
    get bToDIndices(): [number, number] { return [this.vertices.indexOf(this.p1), this.vertices.indexOf(this.p3)] }
    get bToFIndices(): [number, number] { return [this.vertices.indexOf(this.p1), this.vertices.indexOf(this.p5)] }
    get cToDIndices(): [number, number] { return [this.vertices.indexOf(this.p2), this.vertices.indexOf(this.p3)] }
    get cToGIndices(): [number, number] { return [this.vertices.indexOf(this.p2), this.vertices.indexOf(this.p6)] }
    get dToHIndices(): [number, number] { return [this.vertices.indexOf(this.p3), this.vertices.indexOf(this.p7)] }
    get eToFIndices(): [number, number] { return [this.vertices.indexOf(this.p4), this.vertices.indexOf(this.p5)] }
    get eToGIndices(): [number, number] { return [this.vertices.indexOf(this.p4), this.vertices.indexOf(this.p6)] }
    get fToHIndices(): [number, number] { return [this.vertices.indexOf(this.p5), this.vertices.indexOf(this.p7)] }
    get gToHIndices(): [number, number] { return [this.vertices.indexOf(this.p6), this.vertices.indexOf(this.p7)] }

    get lineIndices(): number[] {
        return [
            ...this.aToBIndices, ...this.aToCIndices, ...this.aToEIndices,
            ...this.bToDIndices, ...this.bToFIndices,
            ...this.cToDIndices, ...this.cToGIndices,
            ...this.dToHIndices,
            ...this.eToFIndices, ...this.eToGIndices,
            ...this.fToHIndices,
            ...this.gToHIndices
        ];
    }

    get triangle102Indices(): [number, number, number] { return [this.vertices.indexOf(this.p1), this.vertices.indexOf(this.p0), this.vertices.indexOf(this.p2)] }
    get triangle231Indices(): [number, number, number] { return [this.vertices.indexOf(this.p2), this.vertices.indexOf(this.p3), this.vertices.indexOf(this.p1)] }
    get triangle576Indices(): [number, number, number] { return [this.vertices.indexOf(this.p5), this.vertices.indexOf(this.p7), this.vertices.indexOf(this.p6)] }
    get triangle645Indices(): [number, number, number] { return [this.vertices.indexOf(this.p6), this.vertices.indexOf(this.p4), this.vertices.indexOf(this.p5)] }
    get triangle137Indices(): [number, number, number] { return [this.vertices.indexOf(this.p1), this.vertices.indexOf(this.p3), this.vertices.indexOf(this.p7)] }
    get triangle751Indices(): [number, number, number] { return [this.vertices.indexOf(this.p7), this.vertices.indexOf(this.p5), this.vertices.indexOf(this.p1)] }
    get triangle046Indices(): [number, number, number] { return [this.vertices.indexOf(this.p0), this.vertices.indexOf(this.p4), this.vertices.indexOf(this.p6)] }
    get triangle620Indices(): [number, number, number] { return [this.vertices.indexOf(this.p6), this.vertices.indexOf(this.p2), this.vertices.indexOf(this.p0)] }
    get triangle673Indices(): [number, number, number] { return [this.vertices.indexOf(this.p6), this.vertices.indexOf(this.p7), this.vertices.indexOf(this.p3)] }
    get triangle326Indices(): [number, number, number] { return [this.vertices.indexOf(this.p3), this.vertices.indexOf(this.p2), this.vertices.indexOf(this.p6)] }
    get triangle401Indices(): [number, number, number] { return [this.vertices.indexOf(this.p4), this.vertices.indexOf(this.p0), this.vertices.indexOf(this.p1)] }
    get triangle154Indices(): [number, number, number] { return [this.vertices.indexOf(this.p1), this.vertices.indexOf(this.p5), this.vertices.indexOf(this.p4)] }
    get triangleIndices(): number[] {
        return [
            ...this.triangle102Indices, ...this.triangle231Indices,
            ...this.triangle576Indices, ...this.triangle645Indices,
            ...this.triangle137Indices, ...this.triangle751Indices,
            ...this.triangle046Indices, ...this.triangle620Indices,
            ...this.triangle673Indices, ...this.triangle326Indices,
            ...this.triangle401Indices, ...this.triangle154Indices
        ];
    }


}