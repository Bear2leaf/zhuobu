
import type Engine from "../../engine/main.js";
import type { m4 } from "../../engine/third/twgl/m4";
import type { v3 } from "../../engine/third/twgl/v3";


const module: {
    engine?: Engine
    m4?: typeof m4
    v3?: typeof v3
} = {

}

let time = 0;

function quatFromRotationMatrix(m: m4.Mat4, dst: m4.Mat4) {
    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

    // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
    const m11 = m[0];
    const m12 = m[4];
    const m13 = m[8];
    const m21 = m[1];
    const m22 = m[5];
    const m23 = m[9];
    const m31 = m[2];
    const m32 = m[6];
    const m33 = m[10];

    const trace = m11 + m22 + m33;

    if (trace > 0) {
        const s = 0.5 / Math.sqrt(trace + 1);
        dst[3] = 0.25 / s;
        dst[0] = (m32 - m23) * s;
        dst[1] = (m13 - m31) * s;
        dst[2] = (m21 - m12) * s;
    } else if (m11 > m22 && m11 > m33) {
        const s = 2 * Math.sqrt(1 + m11 - m22 - m33);
        dst[3] = (m32 - m23) / s;
        dst[0] = 0.25 * s;
        dst[1] = (m12 + m21) / s;
        dst[2] = (m13 + m31) / s;
    } else if (m22 > m33) {
        const s = 2 * Math.sqrt(1 + m22 - m11 - m33);
        dst[3] = (m13 - m31) / s;
        dst[0] = (m12 + m21) / s;
        dst[1] = 0.25 * s;
        dst[2] = (m23 + m32) / s;
    } else {
        const s = 2 * Math.sqrt(1 + m33 - m11 - m22);
        dst[3] = (m21 - m12) / s;
        dst[0] = (m13 + m31) / s;
        dst[1] = (m23 + m32) / s;
        dst[2] = 0.25 * s;
    }
}

/**
 * Computes the length of a vector
 * @param {Vector3} v vector to take length of
 * @return {number} length of vector
 */
function length(v: v3.Vec3) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
}


function determinate(m: m4.Mat4) {
    var m00 = m[0 * 4 + 0];
    var m01 = m[0 * 4 + 1];
    var m02 = m[0 * 4 + 2];
    var m03 = m[0 * 4 + 3];
    var m10 = m[1 * 4 + 0];
    var m11 = m[1 * 4 + 1];
    var m12 = m[1 * 4 + 2];
    var m13 = m[1 * 4 + 3];
    var m20 = m[2 * 4 + 0];
    var m21 = m[2 * 4 + 1];
    var m22 = m[2 * 4 + 2];
    var m23 = m[2 * 4 + 3];
    var m30 = m[3 * 4 + 0];
    var m31 = m[3 * 4 + 1];
    var m32 = m[3 * 4 + 2];
    var m33 = m[3 * 4 + 3];
    var tmp_0 = m22 * m33;
    var tmp_1 = m32 * m23;
    var tmp_2 = m12 * m33;
    var tmp_3 = m32 * m13;
    var tmp_4 = m12 * m23;
    var tmp_5 = m22 * m13;
    var tmp_6 = m02 * m33;
    var tmp_7 = m32 * m03;
    var tmp_8 = m02 * m23;
    var tmp_9 = m22 * m03;
    var tmp_10 = m02 * m13;
    var tmp_11 = m12 * m03;

    var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
        (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
    var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
        (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
    var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
        (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
    var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
        (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

    return 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
}

function copy(src: m4.Mat4, dst?: m4.Mat4) {
    dst = dst || new Float32Array(16);

    dst[0] = src[0];
    dst[1] = src[1];
    dst[2] = src[2];
    dst[3] = src[3];
    dst[4] = src[4];
    dst[5] = src[5];
    dst[6] = src[6];
    dst[7] = src[7];
    dst[8] = src[8];
    dst[9] = src[9];
    dst[10] = src[10];
    dst[11] = src[11];
    dst[12] = src[12];
    dst[13] = src[13];
    dst[14] = src[14];
    dst[15] = src[15];

    return dst;
}


function decompose(mat: m4.Mat4, translation: v3.Vec3, quaternion: v3.Vec3, scale: v3.Vec3) {
    let sx = length(mat.slice(0, 3));
    const sy = length(mat.slice(4, 7));
    const sz = length(mat.slice(8, 11));

    // if determinate is negative, we need to invert one scale
    const det = determinate(mat);
    if (det < 0) {
        sx = -sx;
    }

    translation[0] = mat[12];
    translation[1] = mat[13];
    translation[2] = mat[14];

    // scale the rotation part
    const matrix = copy(mat);

    const invSX = 1 / sx;
    const invSY = 1 / sy;
    const invSZ = 1 / sz;

    matrix[0] *= invSX;
    matrix[1] *= invSX;
    matrix[2] *= invSX;

    matrix[4] *= invSY;
    matrix[5] *= invSY;
    matrix[6] *= invSY;

    matrix[8] *= invSZ;
    matrix[9] *= invSZ;
    matrix[10] *= invSZ;

    quatFromRotationMatrix(matrix, quaternion);

    scale[0] = sx;
    scale[1] = sy;
    scale[2] = sz;
}

export const updateCalls: Record<string, Function> = {
    init(engine: Engine, m: typeof m4, v: typeof v3) {
        module.engine = engine;
        module.m4 = m;
        module.v3 = v;
    },
    rotateTerrain() {
        const engine = module.engine!;
        const m4 = module.m4!;
        const v3 = module.v3!;
        const delta = 0.0002 * engine.ticker.delta;
        time += delta;
        {
            const name = "terrain";
            const pName = "terrainGrid";
            const program = engine.programs.find(p => p.name === pName)!;
            const object = engine.objects.find(o => o.name === name)!;
            const model = object.model;
            m4.rotateY(model, delta, model);
            engine.renderer.updateUniform(program, "u_model", "Matrix4fv", ...model);
        }
        {
            const name = "plant";
            const pName = "plant";
            const program = engine.programs.find(p => p.name === pName)!;
            const object = engine.objects.find(o => o.name === name)!;
            const model = object.model;
            m4.rotateY(model, delta, model);
            engine.renderer.updateUniform(program, "u_model", "Matrix4fv", ...model);
        }
        {
            const name = "icon";
            const pName = "icon";
            const program = engine.programs.find(p => p.name === pName)!;
            const object = engine.objects.find(o => o.name === name)!;
            const model = object.model;
            m4.rotateY(model, delta, model);
            engine.renderer.updateUniform(program, "u_model", "Matrix4fv", ...model);
        }
        {
            const name = "water";
            const program = engine.programs.find(p => p.name === name)!;
            const object = engine.objects.find(o => o.name === name)!;
            const model = object.model;
            m4.rotateY(model, delta, model);
            engine.renderer.updateUniform(program, "u_model", "Matrix4fv", ...model);
            engine.renderer.updateUniform(program, "u_time", "1f", time);
        }
        {
            const name = "sky";
            const program = engine.programs.find(p => p.name === name)!;
            const object = engine.objects.find(o => o.name === name)!;
            const model = object.model;
            m4.rotateY(model, -delta, model);
            engine.renderer.updateUniform(program, "u_model", "Matrix4fv", ...model);
        }
    }
};
