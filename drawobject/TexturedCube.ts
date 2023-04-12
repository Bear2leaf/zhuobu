import { device } from "../Device.js";
import Texture from "../Texture.js";
import Cube from "../geometry/Cube.js";
import { Vec4, flatten } from "../math/Vector.js";
import ArrayBufferObject, { ArrayBufferIndex } from "./ArrayBufferObject.js";
import DrawObject from "./DrawObject.js";

export default class TexturedCube extends DrawObject {

    private readonly texture: Texture;
    constructor() {
        const cube = new Cube();
        const triangles = cube.getTriangles();
        const points = cube.getPoints();
        const indices: number[] = [];
        const colors: Vec4[] = [];
        const vertices: Vec4[] = [];
        const textureCoords: Vec4[] = [];
        
        points.forEach((point) => {
            vertices.push(...point.vertices);
            colors.push(...point.colors);
        });
        triangles.forEach((triangle) => {
            indices.push(...triangle.indices);
        });

        for (let index = 0; index < 6; index++) {
            textureCoords.push(new Vec4(0, 1, 0, 0));
            textureCoords.push(new Vec4(0, 0, 0, 0));
            textureCoords.push(new Vec4(1, 1, 0, 0));
            textureCoords.push(new Vec4(1, 0, 0, 0));
        }




        super(new Map<number, ArrayBufferObject>(), indices.length);
        this.aboMap.set(ArrayBufferIndex.Vertices, new ArrayBufferObject(ArrayBufferIndex.Vertices, flatten(vertices), new Uint16Array(indices)))
        this.aboMap.set(ArrayBufferIndex.Colors, new ArrayBufferObject(ArrayBufferIndex.Colors, flatten(colors), new Uint16Array(indices)))
        this.aboMap.set(ArrayBufferIndex.TextureCoords, new ArrayBufferObject(ArrayBufferIndex.TextureCoords, flatten(textureCoords), new Uint16Array(indices)))
        
        this.texture = new Texture(device.gl.CLAMP_TO_EDGE, device.gl.CLAMP_TO_EDGE);
        const textureImage = device.imageCache.get(`static/texture/test.png`);
        if (!textureImage) {
            throw new Error("textureImage not exist")
        }
        this.texture.generate(textureImage);
        
    }
    draw(mode: number): void {
        this.texture.bind()
        super.draw(mode);
    }
}

