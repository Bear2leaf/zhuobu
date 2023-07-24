import { flatten, Vec4 } from "../math/Vector.js";
import DrawObject from "./DrawObject.js";
import Quad from "../math/Quad.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import TextureContainer from "../component/TextureContainer.js";

export default class Sprite extends DrawObject {
    init() {

        super.init();
        const texSize = this.getEntity().get(TextureContainer).getTexture().getSize();
        const quad = new Quad(0, 0, texSize.x, texSize.y);
        quad.initTexCoords();
        const vertices: Vec4[] = []
        const colors: Vec4[] = []
        const indices: number[] = []
        const texcoords: Vec4[] = []
        quad.appendTo(vertices, colors, indices, texcoords);

        this.createABO(ArrayBufferIndex.Position, flatten(vertices), 4);
        this.createABO(ArrayBufferIndex.Color, flatten(colors), 4);
        this.createABO(ArrayBufferIndex.TextureCoord, flatten(texcoords), 4);
        this.updateEBO(new Uint16Array(indices));
        console.log(this.getEntity())
    }
    draw(mode: number): void {
        this.bind();
        super.draw(mode);
    }
}