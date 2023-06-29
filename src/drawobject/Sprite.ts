import { flatten, Vec4 } from "../math/Vector.js";
import DrawObject from "./DrawObject.js";
import Texture, { TextureIndex } from "../texture/Texture.js";
import Quad from "../math/Quad.js";
import RenderingContext, { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import TRS from "../component/TRS.js";

export default class Sprite extends DrawObject {
    updateSprite() {

        const texSize = this.getTexture(TextureIndex.Default).getSize();
        const trs = this.entity.get(TRS);
        const x = trs.getPosition().x;
        const y = trs.getPosition().y;
        const scale = trs.getScale().x;
        const quad = new Quad(x, y, texSize.x * scale, texSize.y * scale);
        quad.setZWToTexCoord();
        const vertices:Vec4[] = []
        const colors:Vec4[] = []
        const indices: number[] = []
        quad.appendTo(vertices, colors, indices);

        this.createABO(ArrayBufferIndex.Position, flatten(vertices), 4);
        this.createABO(ArrayBufferIndex.Color, flatten(colors), 4);
        this.updateEBO(new Uint16Array(indices));
    }
    update(): void {
    }
    draw(mode: number): void {
        this.bind();
        super.draw(mode);
    }
}