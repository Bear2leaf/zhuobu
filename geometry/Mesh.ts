import { Vec4 } from "../math/Vector.js";

export default interface Mesh {
    get triangleIndices(): number[];
    get colors(): Vec4[];
    get vertices(): Vec4[];
    get lineIndices(): number[];
}