import { cross, flatten, normalize, subtract, Vec3, Vec4 } from "./Vector.js";

type Mat4 = [Vec4, Vec4, Vec4, Vec4];

export default class Matrix {
    private readonly columns: Mat4
    constructor(
        a00: number = 0,
        a01: number = 0,
        a02: number = 0,
        a03: number = 0,
        a10: number = 0,
        a11: number = 0,
        a12: number = 0,
        a13: number = 0,
        a20: number = 0,
        a21: number = 0,
        a22: number = 0,
        a23: number = 0,
        a30: number = 0,
        a31: number = 0,
        a32: number = 0,
        a33: number = 0
    ) {
        this.columns = [
            new Vec4(a00, a10, a20, a30)
            , new Vec4(a01, a11, a21, a31)
            , new Vec4(a02, a12, a22, a32)
            , new Vec4(a03, a13, a23, a33)
        ];
    }
    getVertics() {
        return flatten(this.columns);
    }
    multiply(b: Matrix) {
        return Matrix.multiply(this, b, this);
    }
    inverse() {
        return Matrix.inverse(this);
    }
    translate(v: Vec4) {
        return this.multiply(Matrix.translation(v));
    }
    scale(v: Vec4) {
        return this.multiply(Matrix.scaling(v));
    }
    rotateY(angleInRadians: number) {
        return this.multiply(Matrix.rotationY(angleInRadians));
    }
    static rotationY(angleInRadians: number, dst?: Matrix) {
        dst = dst || new Matrix();

        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);

        dst.columns[0].x = c;
        dst.columns[0].y = 0;
        dst.columns[0].z = -s;
        dst.columns[0].w = 0;
        dst.columns[1].x = 0;
        dst.columns[1].y = 1;
        dst.columns[1].z = 0;
        dst.columns[1].w = 0;
        dst.columns[2].x = s;
        dst.columns[2].y = 0;
        dst.columns[2].z = c;
        dst.columns[2].w = 0;
        dst.columns[3].x = 0;
        dst.columns[3].y = 0;
        dst.columns[3].z = 0;
        dst.columns[3].w = 1;

        return dst;

    }
    static translation(v: Vec4, dst?: Matrix) {

        dst = dst || new Matrix();
        dst.columns[0].x = 1;
        dst.columns[0].y = 0;
        dst.columns[0].z = 0;
        dst.columns[0].w = 0;
        dst.columns[1].x = 0;
        dst.columns[1].y = 1;
        dst.columns[1].z = 0;
        dst.columns[1].w = 0;
        dst.columns[2].x = 0;
        dst.columns[2].y = 0;
        dst.columns[2].z = 1;
        dst.columns[2].w = 0;
        dst.columns[3].x = v.x;
        dst.columns[3].y = v.y;
        dst.columns[3].z = v.z;
        dst.columns[3].w = 1;
        return dst;
    }
    static inverse(m: Matrix, dst?: Matrix) {

        dst = dst || new Matrix();

        const m00 = m.columns[0].x;
        const m01 = m.columns[0].y;
        const m02 = m.columns[0].z;
        const m03 = m.columns[0].w;
        const m10 = m.columns[1].x;
        const m11 = m.columns[1].y;
        const m12 = m.columns[1].z;
        const m13 = m.columns[1].w;
        const m20 = m.columns[2].x;
        const m21 = m.columns[2].y;
        const m22 = m.columns[2].z;
        const m23 = m.columns[2].w;
        const m30 = m.columns[3].x;
        const m31 = m.columns[3].y;
        const m32 = m.columns[3].z;
        const m33 = m.columns[3].w;
        const tmp_0 = m22 * m33;
        const tmp_1 = m32 * m23;
        const tmp_2 = m12 * m33;
        const tmp_3 = m32 * m13;
        const tmp_4 = m12 * m23;
        const tmp_5 = m22 * m13;
        const tmp_6 = m02 * m33;
        const tmp_7 = m32 * m03;
        const tmp_8 = m02 * m23;
        const tmp_9 = m22 * m03;
        const tmp_10 = m02 * m13;
        const tmp_11 = m12 * m03;
        const tmp_12 = m20 * m31;
        const tmp_13 = m30 * m21;
        const tmp_14 = m10 * m31;
        const tmp_15 = m30 * m11;
        const tmp_16 = m10 * m21;
        const tmp_17 = m20 * m11;
        const tmp_18 = m00 * m31;
        const tmp_19 = m30 * m01;
        const tmp_20 = m00 * m21;
        const tmp_21 = m20 * m01;
        const tmp_22 = m00 * m11;
        const tmp_23 = m10 * m01;

        const t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
            (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
        const t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
            (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
        const t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
            (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
        const t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
            (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

        const d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

        dst.columns[0].x = d * t0;
        dst.columns[0].y = d * t1;
        dst.columns[0].z = d * t2;
        dst.columns[0].w = d * t3;
        dst.columns[1].x = d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) - (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
        dst.columns[1].y = d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) - (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
        dst.columns[1].z = d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) - (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
        dst.columns[1].w = d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) - (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
        dst.columns[2].x = d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) - (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
        dst.columns[2].y = d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) - (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
        dst.columns[2].z = d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) - (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
        dst.columns[2].w = d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) - (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
        dst.columns[3].x = d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) - (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
        dst.columns[3].y = d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) - (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
        dst.columns[3].z = d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) - (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
        dst.columns[3].w = d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) - (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));

        return dst;
    }
    static scaling(v: Vec4, dst?: Matrix) {

        dst = dst || new Matrix();

        dst.columns[0].x = v.x;
        dst.columns[0].y = 0;
        dst.columns[0].z = 0;
        dst.columns[0].w = 0;
        dst.columns[1].x = 0;
        dst.columns[1].y = v.y;
        dst.columns[1].z = 0;
        dst.columns[1].w = 0;
        dst.columns[2].x = 0;
        dst.columns[2].y = 0;
        dst.columns[2].z = v.z;
        dst.columns[2].w = 0;
        dst.columns[3].x = 0;
        dst.columns[3].y = 0;
        dst.columns[3].z = 0;
        dst.columns[3].w = 1;
        return dst;
    }
    static multiply(a: Matrix, b: Matrix, dst?: Matrix) {
        dst = dst || new Matrix();
        const a00 = a.columns[0].x;
        const a01 = a.columns[0].y;
        const a02 = a.columns[0].z;
        const a03 = a.columns[0].w;
        const a10 = a.columns[1].x;
        const a11 = a.columns[1].y;
        const a12 = a.columns[1].z;
        const a13 = a.columns[1].w;
        const a20 = a.columns[2].x;
        const a21 = a.columns[2].y;
        const a22 = a.columns[2].z;
        const a23 = a.columns[2].w;
        const a30 = a.columns[3].x;
        const a31 = a.columns[3].y;
        const a32 = a.columns[3].z;
        const a33 = a.columns[3].w;
        const b00 = b.columns[0].x;
        const b01 = b.columns[0].y;
        const b02 = b.columns[0].z;
        const b03 = b.columns[0].w;
        const b10 = b.columns[1].x;
        const b11 = b.columns[1].y;
        const b12 = b.columns[1].z;
        const b13 = b.columns[1].w;
        const b20 = b.columns[2].x;
        const b21 = b.columns[2].y;
        const b22 = b.columns[2].z;
        const b23 = b.columns[2].w;
        const b30 = b.columns[3].x;
        const b31 = b.columns[3].y;
        const b32 = b.columns[3].z;
        const b33 = b.columns[3].w;

        dst.columns[0].x = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
        dst.columns[0].y = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
        dst.columns[0].z = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
        dst.columns[0].w = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
        dst.columns[1].x = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
        dst.columns[1].y = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
        dst.columns[1].z = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
        dst.columns[1].w = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
        dst.columns[2].x = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
        dst.columns[2].y = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
        dst.columns[2].z = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
        dst.columns[2].w = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
        dst.columns[3].x = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
        dst.columns[3].y = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
        dst.columns[3].z = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
        dst.columns[3].w = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;
        return dst;
    }
    static identity(): Matrix {
        const mat = new Matrix();
        mat.columns[0].x = 1;
        mat.columns[1].y = 1;
        mat.columns[2].z = 1;
        mat.columns[3].w = 1;
        return mat;
    }
    static lookAt(eye: Vec3, target: Vec3, up: Vec3, dst?: Matrix) {
        dst = dst || new Matrix();
        const xAxis = new Vec3();
        const yAxis = new Vec3();
        const zAxis = new Vec3();
        normalize(subtract(eye, target, zAxis), zAxis);
        normalize(cross(up, zAxis, xAxis), xAxis);
        normalize(cross(zAxis, xAxis, yAxis), yAxis);
        dst.columns[0].x = xAxis.x;
        dst.columns[0].y = xAxis.y;
        dst.columns[0].z = xAxis.z;
        dst.columns[0].w = 0;
        dst.columns[1].x = yAxis.x;
        dst.columns[1].y = yAxis.y;
        dst.columns[1].z = yAxis.z;
        dst.columns[1].w = 0;
        dst.columns[2].x = zAxis.x;
        dst.columns[2].y = zAxis.y;
        dst.columns[2].z = zAxis.z;
        dst.columns[2].w = 0;
        dst.columns[3].x = eye.x;
        dst.columns[3].y = eye.y;
        dst.columns[3].z = eye.z;
        dst.columns[3].w = 1;

        return dst;
    }

    static ortho(left: number, right: number, bottom: number, top: number, near: number, far: number) {
        return new Matrix(
            2 / (right - left), 0, 0, 0,
            0, 2 / (top - bottom), 0, 0,
            0, 0, 2 / (near - far), 0,
            (right + left) / (left - right), (top + bottom) / (bottom - top), (far + near) / (near - far), 1
        );
    }
    static perspective(fieldOfViewYInRadians: number, aspect: number, zNear: number, zFar: number): Matrix {
        const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewYInRadians);
        const rangeInv = 1.0 / (zNear - zFar);
        return new Matrix(
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (zNear + zFar) * rangeInv, -1,
            0, 0, zNear * zFar * rangeInv * 2, 0
        )
    }
}