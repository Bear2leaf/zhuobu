import { device } from "../device/Device.js";
import Shader from "./Shader.js";


export class LineShader extends Shader {
    constructor() {
        super(
            device.getTxtCache().get("static/shader/Line.vert.txt")!,
            device.getTxtCache().get("static/shader/Line.frag.txt")!
        );
    }
}
