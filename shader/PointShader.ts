import { device } from "../device/Device.js";
import Shader from "./Shader.js";


export class PointShader extends Shader {
    constructor() {
        super(
            device.getTxtCache().get("static/shader/Point.vert.txt")!,
            device.getTxtCache().get("static/shader/Point.frag.txt")!
        );
    }
}
