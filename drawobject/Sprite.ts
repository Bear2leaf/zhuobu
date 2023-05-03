import { flatten, Vec2, Vec4 } from "../math/Vector.js";
import DrawObject from "./DrawObject.js";
import ArrayBufferObject, { ArrayBufferIndex } from "./ArrayBufferObject.js";
import Texture, { TextureIndex } from "../texture/Texture.js";
import device from "../device/Device.js";
import Quad from "../geometry/Quad.js";
import Node from "../structure/Node.js";

export default class Sprite extends DrawObject {
    private readonly x: number;
    private readonly y: number;
    private readonly scale: number;
    private readonly originX: number;
    private readonly originY: number;
    constructor(x: number, y: number, scale: number, color: [number, number, number, number], origin: [number, number], imageName: string) {
        super(new Node(), new Map<number, ArrayBufferObject>(), 6);
        this.x = x;
        this.y = y;
        this.scale = scale;
        const spriteTexture = new Texture(device.gl.CLAMP_TO_EDGE, device.gl.CLAMP_TO_EDGE);
        const spriteImage = device.getImageCache().get(`static/sprite/${imageName}.png`);
        if (!spriteImage) {
            throw new Error("spriteImage not exist")
        }
        spriteTexture.generate(spriteImage);
        const texSize = spriteTexture.getSize();
        this.createTexture(TextureIndex.Default, spriteTexture);
        const quad = new Quad(x, y, texSize.x * scale, texSize.y * scale);
        quad.setZWToTexCoord();
        const vertices:Vec4[] = []
        const colors:Vec4[] = []
        const indices: number[] = []
        quad.appendTo(vertices, colors, indices);

        this.createABO(ArrayBufferIndex.Vertices, flatten(vertices), 4);
        this.createABO(ArrayBufferIndex.Colors, flatten(colors), 4);
        this.updateEBO(new Uint16Array(indices));
        this.originX = origin[0];
        this.originY = origin[1];

    }
}