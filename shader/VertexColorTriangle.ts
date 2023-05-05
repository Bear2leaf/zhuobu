import device from "../device/Device.js";
import Shader from "./Shader.js";


export class VertexColorTriangle extends Shader {
    constructor() {
        super(
            device.getTxtCache().get("resource/shader/VertexColorTriangle.vert.sk")!,
            device.getTxtCache().get("resource/shader/VertexColorTriangle.frag.sk")!
        );
    }
}
