export default class GLTFSkin {
    private readonly joints: number[];
    private readonly inverseBindMatrices: number;
    constructor(skin: GLTFSkin) {
        this.joints = skin.joints;
        this.inverseBindMatrices = skin.inverseBindMatrices;
    }
    getJoints() {
        return this.joints;
    }
    getInverseBindMatrices() {
        return this.inverseBindMatrices;
    }
    
}