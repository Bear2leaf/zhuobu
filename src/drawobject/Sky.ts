import Cube from "../geometry/Cube.js";
import { Vec4, flatten } from "../geometry/Vector.js";
import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";

export default class Sky extends DrawObject {
    initContextObjects() {
        super.initContextObjects();

        const vertices: number[] = [
            -1, -1, -1,
            1, -1, -1,
            1, 1, -1,
            -1, 1, -1,
            -1, -1, 1,
            1, -1, 1,
            1, 1, 1,
            -1, 1, 1,
        ];
        const indices: number[] = [
            // cull Front
            0, 1, 2,
            0, 2, 3,
            // cull Back
            6, 5, 4,
            7, 6, 4,
            // cull Top
            3, 2, 6,
            3, 6, 7,
            // cull Bottom
            0, 4, 5,
            0, 5, 1,
            // cull Left
            0, 3, 7,
            0, 7, 4,
            // cull Right
            1, 5, 6,
            1, 6, 2,
        ]
        this.createABO(ArrayBufferIndex.Position, new Float32Array(vertices), 3);
        this.updateEBO(new Uint16Array(indices))
    }
    draw(): void {
        this.getRenderingContext().switchBlend(true);
        this.getRenderingContext().switchCulling(false);
        this.getRenderingContext().switchDepthWrite(false);
        super.draw();
        this.getRenderingContext().switchDepthWrite(true);
        this.getRenderingContext().switchCulling(true);
        this.getRenderingContext().switchBlend(false);
    }

}

