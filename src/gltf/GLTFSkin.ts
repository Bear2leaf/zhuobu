export default class GLTFSkin {
    private readonly joints: number[];
    private readonly inverseBindMatrices: number;
    private readonly skeleton: number;
    constructor(skin: GLTFSkin) {
        this.joints = skin.joints;
        this.inverseBindMatrices = skin.inverseBindMatrices;
        this.skeleton = skin.skeleton;
    }
    getSkeleton() {
        return this.skeleton;
    }
    getJoints() {
        return this.joints;
    }
    getInverseBindMatrices() {
        return this.inverseBindMatrices;
    }
    
}