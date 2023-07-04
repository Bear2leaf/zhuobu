import { flatten, Vec4 } from "../math/Vector.js";
import DrawObject from "./DrawObject.js";
import { TextureIndex } from "../texture/Texture.js";
import Quad from "../math/Quad.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import TRS from "../component/TRS.js";

export default class Sprite extends DrawObject {
    init() {

        super.init();
        const texSize = this.getTexture(TextureIndex.Default).getSize();
        const trs = this.getEntity().get(TRS);
        const x = trs.getPosition().x + 10;
        const y = trs.getPosition().y + 10;
        const scale = trs.getScale().x * 10;
        const quad = new Quad(x, y, texSize.x * scale, texSize.y * scale);
        quad.setZWToTexCoord();
        const vertices: Vec4[] = []
        const colors: Vec4[] = []
        const indices: number[] = []
        quad.appendTo(vertices, colors, indices);

        this.createABO(ArrayBufferIndex.Position, flatten(vertices), 4);
        this.createABO(ArrayBufferIndex.Color, flatten(colors), 4);
        this.updateEBO(new Uint16Array(indices));
    }
    draw(mode: number): void {
        this.bind();
        super.draw(mode);
    }
}