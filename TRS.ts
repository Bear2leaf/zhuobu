import { twgl } from "./global.js";
export default class TRS {
    readonly translation: twgl.v3.Vec3;
    readonly rotation: twgl.v3.Vec3;
    readonly scale: twgl.v3.Vec3;
    constructor() {
        this.translation = [0, 0, 0];
        this.rotation = [0, 0, 0];
        this.scale = [1, 1, 1];
    }
    getMatrix(dst?: twgl.m4.Mat4) {
        dst = dst || new Float32Array(16);
        const t = this.translation;
        const r = this.rotation;
        const s = this.scale;

        // compute a matrix from translation, rotation, and scale
        twgl.m4.translation([t[0], t[1], t[2]], dst);
        twgl.m4.rotateX(dst, r[0], dst);
        twgl.m4.rotateY(dst, r[1], dst);
        twgl.m4.rotateZ(dst, r[2], dst);
        twgl.m4.scale(dst, [s[0], s[1], s[2]], dst);
        return dst;
    }
}

