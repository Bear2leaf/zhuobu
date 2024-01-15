export default class GLTFCameraOrthographic {
    private readonly xmag: number;
    private readonly ymag: number;
    private readonly zfar: number;
    private readonly znear: number;
    constructor(orthographic?: GLTFCameraOrthographic) {
        this.xmag = orthographic?.xmag || 0;
        this.ymag = orthographic?.ymag || 0;
        this.zfar = orthographic?.zfar || 0;
        this.znear = orthographic?.znear || 0;
    }
    getXMag() {
        return this.xmag;
    }
    getYMag() {
        return this.ymag;
    }
    getZFar() {
        return this.zfar;
    }
    getZNear() {
        return this.znear;
    }

}