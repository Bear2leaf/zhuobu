import { Vec4, flatten } from "../math/Vector.js";
import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../contextobject/RenderingContext.js";
import Cube from "../math/Cube.js";

export default class WireCube extends DrawObject {
    init(){
        super.init();
        const cube = new Cube();
        const lines = cube.getLines();
        const points = cube.getPoints();
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
    draw(mode: number): void {
        this.bind()
        super.draw(mode);
    }
}

