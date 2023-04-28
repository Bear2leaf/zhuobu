
export default class GLTFAttribute {
    private readonly POSITION: number;
    private readonly NORMAL: number;
    private readonly TEXCOORD_0: number;

    constructor(attribute: GLTFAttribute) {
        this.POSITION = attribute.POSITION;
        this.NORMAL = attribute.NORMAL;
        this.TEXCOORD_0 = attribute.TEXCOORD_0;
    }
    getPosition() {
        return this.POSITION;
    }
    getNormal() {
        return this.NORMAL;
    }
    getTexCoord() {
        return this.TEXCOORD_0;
    }

}