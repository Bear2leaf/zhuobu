import DrawObject from "../drawobject/DrawObject.js";
import HorizontalQuad from "../geometry/HorizontalQuad.js";
import { Vec4, flatten } from "../geometry/Vector.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import Texture from "../texture/Texture.js";
import Node from "../transform/Node.js";


export default class Water extends DrawObject {
    private reflectTexture?: Texture;
    private distortionTexture?: Texture;
    private normalTexture?: Texture;
    setReflectTexture(texture: Texture) {
        this.reflectTexture = texture;
    }
    getReflectTexture() {
        if (!this.reflectTexture) {
            throw new Error("reflectTexture is not set");
        }
        return this.reflectTexture;
    }
    setDistortionTexture(texture: Texture) {
        this.distortionTexture = texture;
    }
    getDistortionTexture() {
        if (!this.distortionTexture) {
            throw new Error("distortionTexture is not set");
        }
        return this.distortionTexture;
    }
    setNormalTexture(texture: Texture) {
        this.normalTexture = texture;
    }
    getNormalTexture() {
        if (!this.normalTexture) {
            throw new Error("normalTexture is not set");
        }
        return this.normalTexture;
    }
    init() {

        super.init();
        const quad = new HorizontalQuad(-5, -5, 10, 10);
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
        this.getEntity().get(Node).updateWorldMatrix();
    }
    draw(): void {
        this.getNormalTexture().bind();
        this.getRenderingContext().switchRepeat(true);
        this.getDistortionTexture().bind();
        this.getRenderingContext().switchRepeat(true);
        super.draw();

    }
}