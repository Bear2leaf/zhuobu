import { Vec4 } from "../math/Vector.js";
import Mesh from "./Mesh.js";

export default class Cone implements Mesh {
    private readonly tip: Vec4;
    private readonly tr: Vec4;
    private readonly br: Vec4;
    private readonly bl: Vec4;
    private readonly tl: Vec4;
    constructor() {
        this.tip = new Vec4(0, 0, 1, 1);
        this.tr = new Vec4(1, 1, -1, 1);
        this.br = new Vec4(1, -1, -1, 1);
        this.bl = new Vec4(-1, -1, -1, 1);
        this.tl = new Vec4(-1, 1, -1, 1);
    }
    get colors(): Vec4[] {
        return [
            new Vec4(1, 0, 0, 1),
            new Vec4(0, 1, 0, 1),
            new Vec4(0, 0, 1, 1),
            new Vec4(1, 1, 0, 1),
            new Vec4(1, 0, 1, 1),
        ];
    }
    get vertices(): Vec4[] {
        return [
            this.tip, this.tr, this.br, this.bl, this.tl
        ];
    }
    get tipToTrIndices(): [number, number] { return [this.vertices.indexOf(this.tip), this.vertices.indexOf(this.tr)]; }
    get tipToBrIndices(): [number, number] { return [this.vertices.indexOf(this.tip), this.vertices.indexOf(this.br)]; }
    get tipToBlIndices(): [number, number] { return [this.vertices.indexOf(this.tip), this.vertices.indexOf(this.bl)]; }
    get tipToTlIndices(): [number, number] { return [this.vertices.indexOf(this.tip), this.vertices.indexOf(this.tl)]; }
    get trToBrIndices(): [number, number] { return [this.vertices.indexOf(this.tr), this.vertices.indexOf(this.br)]; }
    get brToBlIndices(): [number, number] { return [this.vertices.indexOf(this.br), this.vertices.indexOf(this.bl)]; }
    get blToTlIndices(): [number, number] { return [this.vertices.indexOf(this.bl), this.vertices.indexOf(this.tl)]; }
    get tlToTrIndices(): [number, number] { return [this.vertices.indexOf(this.tl), this.vertices.indexOf(this.tr)]; }

    get lineIndices(): number[] {
        return [
            ...this.tipToBlIndices,
            ...this.tipToBrIndices,
            ...this.tipToTlIndices,
            ...this.tipToTrIndices,
            ...this.trToBrIndices,
            ...this.brToBlIndices,
            ...this.blToTlIndices,
            ...this.tlToTrIndices,
        ];
    }

    get triangleTipToTrToBrIndices(): [number, number, number] { return [this.vertices.indexOf(this.tip), this.vertices.indexOf(this.tr), this.vertices.indexOf(this.br)]; }
    get triangleTipToBrToBlIndices(): [number, number, number] { return [this.vertices.indexOf(this.tip), this.vertices.indexOf(this.br), this.vertices.indexOf(this.bl)]; }
    get triangleTipToBlToTlIndices(): [number, number, number] { return [this.vertices.indexOf(this.tip), this.vertices.indexOf(this.bl), this.vertices.indexOf(this.tl)]; }
    get triangleTipToTlToTrIndices(): [number, number, number] { return [this.vertices.indexOf(this.tip), this.vertices.indexOf(this.tl), this.vertices.indexOf(this.tr)]; }
    get triangleTrToBrToBlIndices(): [number, number, number] { return [this.vertices.indexOf(this.tr), this.vertices.indexOf(this.br), this.vertices.indexOf(this.bl)]; }
    get triangleTrToBlToTlIndices(): [number, number, number] { return [this.vertices.indexOf(this.tr), this.vertices.indexOf(this.bl), this.vertices.indexOf(this.tl)]; }
    get triangleTrToTlToTrIndices(): [number, number, number] { return [this.vertices.indexOf(this.tr), this.vertices.indexOf(this.tl), this.vertices.indexOf(this.tr)]; }
    get triangleIndices(): number[] {
        return [
            ...this.triangleTipToTrToBrIndices,
            ...this.triangleTipToBrToBlIndices,
            ...this.triangleTipToBlToTlIndices,
            ...this.triangleTipToTlToTrIndices,
            ...this.triangleTrToBrToBlIndices,
            ...this.triangleTrToBlToTlIndices,
            ...this.triangleTrToTlToTrIndices,
        ];
    }


}