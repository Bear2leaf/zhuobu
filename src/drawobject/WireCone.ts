import Cone from "../geometry/Cone.js";
import { Vec4, flatten } from "../geometry/Vector.js";
import { ArrayBufferIndex } from "../contextobject/RenderingContext.js";
import DrawObject from "./DrawObject.js";

export default class WireCone extends DrawObject {
    init() {
        super.init();
        const cone = new Cone();
        const lines = cone.getLines();
        const points = cone.getPoints();
        const colors: Vec4[] = [];
        const indices: number[] = [];
        const vertices: Vec4[] = [];
        lines.forEach((line) => line.appendTo(undefined, undefined, indices));
        points.forEach((point) => {
            point.appendTo(vertices, colors);
        });

        this.createABO(ArrayBufferIndex.Position, flatten(vertices), 4)
        this.createABO(ArrayBufferIndex.Color, flatten(colors), 4)
        this.updateEBO(new Uint16Array(indices));
    }
    update(): void {
        
    }
    draw(mode: number): void {
        this.bind()
        super.draw(mode);
    }
}

