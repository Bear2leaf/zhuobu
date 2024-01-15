export default class GLTFCameraPerspective {
    private readonly aspectRatio: number;
    private readonly yfov: number;
    private readonly zfar: number;
    private readonly znear: number;
    constructor(perspective?: GLTFCameraPerspective) {
        this.aspectRatio = perspective?.aspectRatio || 0;
        this.yfov = perspective?.yfov || 0;
        this.zfar = perspective?.zfar || 0;
        this.znear = perspective?.znear || 0;
    }
    getAspectRatio() {
        return this.aspectRatio;
    }
    getYFov() {
        return this.yfov;
    }
    getZFar() {
        return this.zfar;
    }
    getZNear() {
        return this.znear;
    }
    
}