
export default class GLTFAttribute {
    private readonly POSITION: number;
    private readonly NORMAL: number;
    private readonly WEIGHTS_0: number;
    private readonly JOINTS_0: number;
    private readonly TEXCOORD_0: number;

    constructor(attribute: GLTFAttribute) {
        this.POSITION = attribute.POSITION;
        this.NORMAL = attribute.NORMAL;
        this.TEXCOORD_0 = attribute.TEXCOORD_0;
        this.WEIGHTS_0 = attribute.WEIGHTS_0;
        this.JOINTS_0 = attribute.JOINTS_0;
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
    getWeights() {
        return this.WEIGHTS_0;
    }
    getJoints() {
        return this.JOINTS_0;
    }


}