import { device } from "../device/Device.js";
import Shader from "./Shader.js";


export class LineShader extends Shader {
    constructor() {
        super(
            device.getTxtCache().get("static/shader/Line.vert.sk")!,
            device.getTxtCache().get("static/shader/Line.frag.sk")!
        );
    }
}
