import Cube from "../geometry/Cube.js";
import { Vec4, flatten } from "../geometry/Vector.js";
import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";

export default class Skybox extends DrawObject {
    initContextObjects() {
        super.initContextObjects();
        const cube = new Cube();
        const triangles = cube.getTriangles();
        const points = cube.getPoints();
        const indices: number[] = [];
        const colors: Vec4[] = [new Vec4(1, 1, 1, 1)];
        const vertices: Vec4[] = [];
        const textureCoords: Vec4[] = [];

        points.forEach((point) => {
            point.appendTo(vertices, colors)
        });
        triangles.forEach((triangle) => {
            triangle.appendTo(undefined, undefined, indices);
        });
        

        this.createABO(ArrayBufferIndex.Position, flatten(vertices), 4);
        this.createABO(ArrayBufferIndex.Color, flatten(colors), 4);
        this.createABO(ArrayBufferIndex.TextureCoord, flatten(textureCoords), 2);
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

