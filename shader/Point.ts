import { device } from "../device/Device.js";
import Shader from "./Shader.js";


export class Point extends Shader {
    constructor() {
        super(
            device.getTxtCache().get("static/shader/Point.vert.txt")!,
            device.getTxtCache().get("static/shader/Point.frag.txt")!
        );
    }
}
