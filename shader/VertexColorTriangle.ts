import { device } from "../device/Device.js";
import Shader from "./Shader.js";


export class VertexColorTriangle extends Shader {
    constructor() {
        super(
            device.getTxtCache().get("static/shader/VertexColorTriangle.vert.sk")!,
            device.getTxtCache().get("static/shader/VertexColorTriangle.frag.sk")!
        );
    }
}
