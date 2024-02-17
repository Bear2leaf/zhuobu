type Matrix = number[] | Float32Array;
const matrix = {
    identity(dst?: Matrix) {
        dst = dst || new Float32Array(16);
        dst[0] = 1;
        dst[1] = 0;
        dst[2] = 0;
        dst[3] = 0;
        dst[4] = 0;
        dst[5] = 1;
        dst[6] = 0;
        dst[7] = 0;
        dst[8] = 0;
        dst[9] = 0;
        dst[10] = 1;
        dst[11] = 0;
        dst[12] = 0;
        dst[13] = 0;
        dst[14] = 0;
        dst[15] = 1;
        return dst;
    },
    rotateX(m: Matrix, angleInRadians: number, dst?: Matrix) {
        dst = dst || new Float32Array(16);
        const m10 = m[4];
        const m11 = m[5];
        const m12 = m[6];
        const m13 = m[7];
        const m20 = m[8];
        const m21 = m[9];
        const m22 = m[10];
        const m23 = m[11];
        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);
        dst[4] = c * m10 + s * m20;
        dst[5] = c * m11 + s * m21;
        dst[6] = c * m12 + s * m22;
        dst[7] = c * m13 + s * m23;
        dst[8] = c * m20 - s * m10;
        dst[9] = c * m21 - s * m11;
        dst[10] = c * m22 - s * m12;
        dst[11] = c * m23 - s * m13;
        if (m !== dst) {
            dst[0] = m[0];
            dst[1] = m[1];
            dst[2] = m[2];
            dst[3] = m[3];
            dst[12] = m[12];
            dst[13] = m[13];
            dst[14] = m[14];
            dst[15] = m[15];
        }
        return dst;
    },
    rotateY(m: Matrix, angleInRadians: number, dst?: Matrix) {
        dst = dst || new Float32Array(16);
        const m00 = m[0 * 4 + 0];
        const m01 = m[0 * 4 + 1];
        const m02 = m[0 * 4 + 2];
        const m03 = m[0 * 4 + 3];
        const m20 = m[2 * 4 + 0];
        const m21 = m[2 * 4 + 1];
        const m22 = m[2 * 4 + 2];
        const m23 = m[2 * 4 + 3];
        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);
        dst[0] = c * m00 - s * m20;
        dst[1] = c * m01 - s * m21;
        dst[2] = c * m02 - s * m22;
        dst[3] = c * m03 - s * m23;
        dst[8] = c * m20 + s * m00;
        dst[9] = c * m21 + s * m01;
        dst[10] = c * m22 + s * m02;
        dst[11] = c * m23 + s * m03;
        if (m !== dst) {
            dst[4] = m[4];
            dst[5] = m[5];
            dst[6] = m[6];
            dst[7] = m[7];
            dst[12] = m[12];
            dst[13] = m[13];
            dst[14] = m[14];
            dst[15] = m[15];
        }
        return dst;
    }
}
export default matrix;