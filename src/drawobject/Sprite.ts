import { flatten, Vec4 } from "../math/Vector.js";
import DrawObject from "./DrawObject.js";
import Quad from "../math/Quad.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import TRS from "../component/TRS.js";
import TextureContainer from "../component/TextureContainer.js";

export default class Sprite extends DrawObject {
    init() {

        super.init();
        const texSize = this.getEntity().get(TextureContainer).getTexture().getSize();
        const trs = this.getEntity().get(TRS);
        const x = trs.getPosition().x;
        const y = trs.getPosition().y;
        const scale = trs.getScale();
        const quad = new Quad(x, y, texSize.x * scale.x, texSize.y * scale.y);
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