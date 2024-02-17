/*
 * From http://www.redblobgames.com/maps/mapgen2/
 * Copyright 2017 Red Blob Games <redblobgames@gmail.com>
 * License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
 */


/**
 * Return value, unless it's undefined, then return orElse
 */
export function fallback(value: number, orElse: number) {
    return (value !== undefined) ? value : orElse;
};


/**
 * Like GLSL. Return t clamped to the range [lo,hi] inclusive 
 */
export function clamp(t: number, lo: number, hi: number) {
    if (t < lo) { return lo; }
    if (t > hi) { return hi; }
    return t;
};

/**
 * Like GLSL. Return a mix of a and b; all a when is 0 and all b when
 * t is 1; extrapolates when t outside the range [0,1] 
 */
export function mix(a: number, b: number, t: number) {
    return a * (1.0 - t) + b * t;
};

/**
 * Componentwise mix for arrays of equal length; output goes in 'out'
 */
export function mixp(out: number[], p: number[], q: number[], t: number) {
    out.length = p.length;
    for (let i = 0; i < p.length; i++) {
        out[i] = mix(p[i], q[i], t);
    }
    return out;
};

/**
 * Like GLSL. 
 */
export function smoothstep(a: number, b: number, t: number) {
    // https://en.wikipedia.org/wiki/Smoothstep
    if (t <= a) { return 0; }
    if (t >= b) { return 1; }
    t = (t - a) / (b - a);
    return (3 - 2 * t) * t * t;
};

/**
 * Circumcenter of a triangle with vertices a,b,c
 */
export function circumcenter(a: number[], b: number[], c: number[]) {
    // https://en.wikipedia.org/wiki/Circumscribed_circle#Circumcenter_coordinates
    let ad = a[0] * a[0] + a[1] * a[1],
        bd = b[0] * b[0] + b[1] * b[1],
        cd = c[0] * c[0] + c[1] * c[1];
    let D = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
    let Ux = 1 / D * (ad * (b[1] - c[1]) + bd * (c[1] - a[1]) + cd * (a[1] - b[1]));
    let Uy = 1 / D * (ad * (c[0] - b[0]) + bd * (a[0] - c[0]) + cd * (b[0] - a[0]));
    return [Ux, Uy];
};

/**
 * Intersection of line p1--p2 and line p3--p4,
 * between 0.0 and 1.0 if it's in the line segment
 */
export function lineIntersection(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) {
    // from http://paulbourke.net/geometry/pointlineplane/
    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    return { ua, ub };
};

/**
 * in-place shuffle of an array - Fisher-Yates
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
 */
export function randomShuffle(array: number[], randInt: (seed: number) => number) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = randInt(i + 1);
        let swap = array[i];
        array[i] = array[j];
        array[j] = swap;
    }
    return array;
}; export const matrix = {
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
    },
    scale(m: Matrix, v: number[], dst?: Matrix) {
        dst = dst || new Float32Array(16);

        const v0 = v[0];
        const v1 = v[1];
        const v2 = v[2];

        dst[0] = v0 * m[0 * 4 + 0];
        dst[1] = v0 * m[0 * 4 + 1];
        dst[2] = v0 * m[0 * 4 + 2];
        dst[3] = v0 * m[0 * 4 + 3];
        dst[4] = v1 * m[1 * 4 + 0];
        dst[5] = v1 * m[1 * 4 + 1];
        dst[6] = v1 * m[1 * 4 + 2];
        dst[7] = v1 * m[1 * 4 + 3];
        dst[8] = v2 * m[2 * 4 + 0];
        dst[9] = v2 * m[2 * 4 + 1];
        dst[10] = v2 * m[2 * 4 + 2];
        dst[11] = v2 * m[2 * 4 + 3];

        if (m !== dst) {
            dst[12] = m[12];
            dst[13] = m[13];
            dst[14] = m[14];
            dst[15] = m[15];
        }

        return dst;
    }
};

