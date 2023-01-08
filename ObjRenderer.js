import { device } from "./Device.js";
import { TriangleRenderer } from "./Renderer.js";
export default class ObjRenderer extends TriangleRenderer {
    constructor() {
        super();
        device.txtCache.get("static/obj/cube.obj");
    }
}
//# sourceMappingURL=ObjRenderer.js.map