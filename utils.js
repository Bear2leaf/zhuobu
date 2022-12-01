/**
 * @type {WebGL2RenderingContext}
 */
export const gl = wx.createCanvas().getContext('webgl2');

/**
 * Computes a 4-by-4 orthogonal transformation matrix given the left, right,
 * bottom, and top dimensions of the near clipping plane as well as the
 * near and far clipping plane distances.
 * @param {number} left Left side of the near clipping plane viewport.
 * @param {number} right Right side of the near clipping plane viewport.
 * @param {number} bottom Bottom of the near clipping plane viewport.
 * @param {number} top Top of the near clipping plane viewport.
 * @param {number} near The depth (negative z coordinate)
 *     of the near clipping plane.
 * @param {number} far The depth (negative z coordinate)
 *     of the far clipping plane.
 * @param {number[]} [dst] Output matrix. If not passed a new one is created.
 * @return {number[]} The perspective matrix.
 * @memberOf module:twgl/m4
 */
export function ortho(left, right, bottom, top, near, far, dst) {
    dst = dst || new Array(16);

    dst[0] = 2 / (right - left);
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;

    dst[4] = 0;
    dst[5] = 2 / (top - bottom);
    dst[6] = 0;
    dst[7] = 0;

    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 2 / (near - far);
    dst[11] = 0;

    dst[12] = (right + left) / (left - right);
    dst[13] = (top + bottom) / (bottom - top);
    dst[14] = (far + near) / (near - far);
    dst[15] = 1;

    return dst;
}