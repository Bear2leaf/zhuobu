import { flatten, Vec4 } from "../geometry/Vector.js";
import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import HorizontalQuad from "../geometry/HorizontalQuad.js";
import TRS from "../transform/TRS.js";
import Node from "../transform/Node.js";

export default class Terrian extends DrawObject {
    private readonly tileNumber = 5;
    init() {

        super.init();
        const vertices: Vec4[] = []
        const colors: Vec4[] = []
        const indices: number[] = []
        const texcoords: Vec4[] = []
        for (let i = -this.tileNumber; i < this.tileNumber; i++) {
            for (let j = -this.tileNumber; j < this.tileNumber; j++) {

                const quad = new HorizontalQuad(i, j, 10, 10);
                quad.initTexCoords();
                quad.appendTo(vertices, colors, indices, texcoords);
            }
        }
        for(const texcoord of texcoords) {
            texcoord.x *= 2;
            texcoord.y *= 2;
        }

        this.createABO(ArrayBufferIndex.Position, flatten(vertices), 4);
        this.createABO(ArrayBufferIndex.Color, flatten(colors), 4);
        this.createABO(ArrayBufferIndex.TextureCoord, flatten(texcoords), 4);
        this.updateEBO(new Uint16Array(indices));
        this.getEntity().get(TRS).getPosition().y = 2;
        this.getEntity().get(Node).updateWorldMatrix();
    }
    draw(): void {
        this.getTexture().bind()
        this.getRenderingContext().switchRepeat(true);
        super.draw();
        this.getRenderingContext().switchRepeat(true);

    }
}