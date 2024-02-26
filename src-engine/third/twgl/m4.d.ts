import { v3 } from "./v3.js";

export module m4 {
    /**
     * A JavaScript array with 16 values or a Float32Array with 16 values.
     * When created by the library will create the default type which is `Float32Array`
     * but can be set by calling {@link m4.setDefaultType}.
     * @typedef {(number[]|Float32Array)} Mat4
     * @memberOf module:twgl/m4
     */
    export type Mat4 = number[] | Float32Array;
    /**
     * Sets the type this library creates for a Mat4
     * @param {constructor} ctor the constructor for the type. Either `Float32Array` or `Array`
     * @return {constructor} previous constructor for Mat4
     * @memberOf module:twgl/m4
     */
    export function setDefaultType(ctor: Function): Function;
    /**
     * Negates a matrix.
     * @param {m4.Mat4} m The matrix.
     * @param {m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
     * @return {m4.Mat4} -m.
     * @memberOf module:twgl/m4
     */
    export function negate(m: m4.Mat4, dst?: m4.Mat4): m4.Mat4;
    /**
     * Creates a matrix.
     * @return {m4.Mat4} A new matrix.
     * @memberOf module:twgl/m4
     */
    export function create(): m4.Mat4;
    /**
     * Copies a matrix.
     * @param {m4.Mat4} m The matrix.
     * @param {m4.Mat4} [dst] The matrix. If not passed a new one is created.
     * @return {m4.Mat4} A copy of m.
     * @memberOf module:twgl/m4
     */
    export function copy(m: m4.Mat4, dst?: m4.Mat4): m4.Mat4;
    /**
     * Creates an n-by-n identity matrix.
     *
     * @param {m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
     * @return {m4.Mat4} An n-by-n identity matrix.
     * @memberOf module:twgl/m4
     */
    export function identity(dst?: m4.Mat4): m4.Mat4;
    /**
     * Takes the transpose of a matrix.
     * @param {m4.Mat4} m The matrix.
     * @param {m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
     * @return {m4.Mat4} The transpose of m.
     * @memberOf module:twgl/m4
     */
    export function transpose(m: m4.Mat4, dst?: m4.Mat4): m4.Mat4;
    /**
     * Computes the inverse of a 4-by-4 matrix.
     * @param {m4.Mat4} m The matrix.
     * @param {m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
     * @return {m4.Mat4} The inverse of m.
     * @memberOf module:twgl/m4
     */
    export function inverse(m: m4.Mat4, dst?: m4.Mat4): m4.Mat4;
    /**
     * Multiplies two 4-by-4 matrices with a on the left and b on the right
     * @param {m4.Mat4} a The matrix on the left.
     * @param {m4.Mat4} b The matrix on the right.
     * @param {m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
     * @return {m4.Mat4} The matrix product of a and b.
     * @memberOf module:twgl/m4
     */
    export function multiply(a: m4.Mat4, b: m4.Mat4, dst?: m4.Mat4): m4.Mat4;
    /**
     * Sets the translation component of a 4-by-4 matrix to the given
     * vector.
     * @param {m4.Mat4} a The matrix.
     * @param {v3.Vec3} v The vector.
     * @param {m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
     * @return {m4.Mat4} The matrix with translation set.
     * @memberOf module:twgl/m4
     */
    export function setTranslation(a: m4.Mat4, v: v3.Vec3, dst?: m4.Mat4): m4.Mat4;
    /**
     * Returns the translation component of a 4-by-4 matrix as a vector with 3
     * entries.
     * @param {m4.Mat4} m The matrix.
     * @param {v3.Vec3} [dst] vector to hold result. If not passed a new one is created.
     * @return {v3.Vec3} The translation component of m.
     * @memberOf module:twgl/m4
     */
    export function getTranslation(m: m4.Mat4, dst?: v3.Vec3): v3.Vec3;
    /**
     * Returns an axis of a 4x4 matrix as a vector with 3 entries
     * @param {m4.Mat4} m The matrix.
     * @param {number} axis The axis 0 = x, 1 = y, 2 = z;
     * @return {v3.Vec3} [dst] vector.
     * @return {v3.Vec3} The axis component of m.
     * @memberOf module:twgl/m4
     */
    export function getAxis(m: m4.Mat4, axis: number): void;
    /**
     * Sets an axis of a 4x4 matrix as a vector with 3 entries
     * @param {m4.Mat4} m The matrix.
     * @param {v3.Vec3} v the axis vector
     * @param {number} axis The axis  0 = x, 1 = y, 2 = z;
     * @param {m4.Mat4} [dst] The matrix to set. If not passed a new one is created.
     * @return {m4.Mat4} The matrix with axis set.
     * @memberOf module:twgl/m4
     */
    export function setAxis(m: m4.Mat4, v: v3.Vec3, axis: number, dst?: m4.Mat4): m4.Mat4;
    /**
     * Computes a 4-by-4 perspective transformation matrix given the angular height
     * of the frustum, the aspect ratio, and the near and far clipping planes.  The
     * arguments define a frustum extending in the negative z direction.  The given
     * angle is the vertical angle of the frustum, and the horizontal angle is
     * determined to produce the given aspect ratio.  The arguments near and far are
     * the distances to the near and far clipping planes.  Note that near and far
     * are not z coordinates, but rather they are distances along the negative
     * z-axis.  The matrix generated sends the viewing frustum to the unit box.
     * We assume a unit box extending from -1 to 1 in the x and y dimensions and
     * from 0 to 1 in the z dimension.
     * @param {number} fieldOfViewYInRadians The camera angle from top to bottom (in radians).
     * @param {number} aspect The aspect ratio width / height.
     * @param {number} zNear The depth (negative z coordinate)
     *     of the near clipping plane.
     * @param {number} zFar The depth (negative z coordinate)
     *     of the far clipping plane.
     * @param {m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
     * @return {m4.Mat4} The perspective matrix.
     * @memberOf module:twgl/m4
     */
    export function perspective(fieldOfViewYInRadians: number, aspect: number, zNear: number, zFar: number, dst?: m4.Mat4): m4.Mat4;
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
     * @param {m4.Mat4} [dst] Output matrix. If not passed a new one is created.
     * @return {m4.Mat4} The perspective matrix.
     * @memberOf module:twgl/m4
     */
    export function ortho(left: number, right: number, bottom: number, top: number, near: number, far: number, dst?: m4.Mat4): m4.Mat4;
    /**
     * Computes a 4-by-4 perspective transformation matrix given the left, right,
     * top, bottom, near and far clipping planes. The arguments define a frustum
     * extending in the negative z direction. The arguments near and far are the
     * distances to the near and far clipping planes. Note that near and far are not
     * z coordinates, but rather they are distances along the negative z-axis. The
     * matrix generated sends the viewing frustum to the unit box. We assume a unit
     * box extending from -1 to 1 in the x and y dimensions and from 0 to 1 in the z
     * dimension.
     * @param {number} left The x coordinate of the left plane of the box.
     * @param {number} right The x coordinate of the right plane of the box.
     * @param {number} bottom The y coordinate of the bottom plane of the box.
     * @param {number} top The y coordinate of the right plane of the box.
     * @param {number} near The negative z coordinate of the near plane of the box.
     * @param {number} far The negative z coordinate of the far plane of the box.
     * @param {m4.Mat4} [dst] Output matrix. If not passed a new one is created.
     * @return {m4.Mat4} The perspective projection matrix.
     * @memberOf module:twgl/m4
     */
    export function frustum(left: number, right: number, bottom: number, top: number, near: number, far: number, dst?: m4.Mat4): m4.Mat4;
    /**
     * Computes a 4-by-4 look-at transformation.
     *
     * This is a matrix which positions the camera itself. If you want
     * a view matrix (a matrix which moves things in front of the camera)
     * take the inverse of this.
     *
     * @param {v3.Vec3} eye The position of the eye.
     * @param {v3.Vec3} target The position meant to be viewed.
     * @param {v3.Vec3} up A vector pointing up.
     * @param {m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
     * @return {m4.Mat4} The look-at matrix.
     * @memberOf module:twgl/m4
     */
    export function lookAt(eye: v3.Vec3, target: v3.Vec3, up: v3.Vec3, dst?: m4.Mat4): m4.Mat4;
    /**
     * Creates a 4-by-4 matrix which translates by the given vector v.
     * @param {v3.Vec3} v The vector by
     *     which to translate.
     * @param {m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
     * @return {m4.Mat4} The translation matrix.
     * @memberOf module:twgl/m4
     */
    export function translation(v: v3.Vec3, dst?: m4.Mat4): m4.Mat4;
    /**
     * Translates the given 4-by-4 matrix by the given vector v.
     * @param {m4.Mat4} m The matrix.
     * @param {v3.Vec3} v The vector by
     *     which to translate.
     * @param {m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
     * @return {m4.Mat4} The translated matrix.
     * @memberOf module:twgl/m4
     */
    export function translate(m: m4.Mat4, v: v3.Vec3, dst?: m4.Mat4): m4.Mat4;
    /**
     * Creates a 4-by-4 matrix which rotates around the x-axis by the given angle.
     * @param {number} angleInRadians The angle by which to rotate (in radians).
     * @param {m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
     * @return {m4.Mat4} The rotation matrix.
     * @memberOf module:twgl/m4
     */
    export function rotationX(angleInRadians: number, dst?: m4.Mat4): m4.Mat4;
    /**
     * Rotates the given 4-by-4 matrix around the x-axis by the given
     * angle.
     * @param {m4.Mat4} m The matrix.
     * @param {number} angleInRadians The angle by which to rotate (in radians).
     * @param {m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
     * @return {m4.Mat4} The rotated matrix.
     * @memberOf module:twgl/m4
     */
    export function rotateX(m: m4.Mat4, angleInRadians: number, dst?: m4.Mat4): m4.Mat4;
    /**
     * Creates a 4-by-4 matrix which rotates around the y-axis by the given angle.
     * @param {number} angleInRadians The angle by which to rotate (in radians).
     * @param {m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
     * @return {m4.Mat4} The rotation matrix.
     * @memberOf module:twgl/m4
     */
    export function rotationY(angleInRadians: number, dst?: m4.Mat4): m4.Mat4;
    /**
     * Rotates the given 4-by-4 matrix around the y-axis by the given
     * angle.
     * @param {m4.Mat4} m The matrix.
     * @param {number} angleInRadians The angle by which to rotate (in radians).
     * @param {m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
     * @return {m4.Mat4} The rotated matrix.
     * @memberOf module:twgl/m4
     */
    export function rotateY(m: m4.Mat4, angleInRadians: number, dst?: m4.Mat4): m4.Mat4;
    /**
     * Creates a 4-by-4 matrix which rotates around the z-axis by the given angle.
     * @param {number} angleInRadians The angle by which to rotate (in radians).
     * @param {m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
     * @return {m4.Mat4} The rotation matrix.
     * @memberOf module:twgl/m4
     */
    export function rotationZ(angleInRadians: number, dst?: m4.Mat4): m4.Mat4;
    /**
     * Rotates the given 4-by-4 matrix around the z-axis by the given
     * angle.
     * @param {m4.Mat4} m The matrix.
     * @param {number} angleInRadians The angle by which to rotate (in radians).
     * @param {m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
     * @return {m4.Mat4} The rotated matrix.
     * @memberOf module:twgl/m4
     */
    export function rotateZ(m: m4.Mat4, angleInRadians: number, dst?: m4.Mat4): m4.Mat4;
    /**
     * Creates a 4-by-4 matrix which rotates around the given axis by the given
     * angle.
     * @param {v3.Vec3} axis The axis
     *     about which to rotate.
     * @param {number} angleInRadians The angle by which to rotate (in radians).
     * @param {m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
     * @return {m4.Mat4} A matrix which rotates angle radians
     *     around the axis.
     * @memberOf module:twgl/m4
     */
    export function axisRotation(axis: v3.Vec3, angleInRadians: number, dst?: m4.Mat4): m4.Mat4;
    /**
     * Rotates the given 4-by-4 matrix around the given axis by the
     * given angle.
     * @param {m4.Mat4} m The matrix.
     * @param {v3.Vec3} axis The axis
     *     about which to rotate.
     * @param {number} angleInRadians The angle by which to rotate (in radians).
     * @param {m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
     * @return {m4.Mat4} The rotated matrix.
     * @memberOf module:twgl/m4
     */
    export function axisRotate(m: m4.Mat4, axis: v3.Vec3, angleInRadians: number, dst?: m4.Mat4): m4.Mat4;
    /**
     * Creates a 4-by-4 matrix which scales in each dimension by an amount given by
     * the corresponding entry in the given vector; assumes the vector has three
     * entries.
     * @param {v3.Vec3} v A vector of
     *     three entries specifying the factor by which to scale in each dimension.
     * @param {m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
     * @return {m4.Mat4} The scaling matrix.
     * @memberOf module:twgl/m4
     */
    export function scaling(v: v3.Vec3, dst?: m4.Mat4): m4.Mat4;
    /**
     * Scales the given 4-by-4 matrix in each dimension by an amount
     * given by the corresponding entry in the given vector; assumes the vector has
     * three entries.
     * @param {m4.Mat4} m The matrix to be modified.
     * @param {v3.Vec3} v A vector of three entries specifying the
     *     factor by which to scale in each dimension.
     * @param {m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
     * @return {m4.Mat4} The scaled matrix.
     * @memberOf module:twgl/m4
     */
    export function scale(m: m4.Mat4, v: v3.Vec3, dst?: m4.Mat4): m4.Mat4;
    /**
     * Takes a 4-by-4 matrix and a vector with 3 entries,
     * interprets the vector as a point, transforms that point by the matrix, and
     * returns the result as a vector with 3 entries.
     * @param {m4.Mat4} m The matrix.
     * @param {v3.Vec3} v The point.
     * @param {v3.Vec3} [dst] optional vec3 to store result. If not passed a new one is created.
     * @return {v3.Vec3} The transformed point.
     * @memberOf module:twgl/m4
     */
    export function transformPoint(m: m4.Mat4, v: v3.Vec3, dst?: v3.Vec3): v3.Vec3;
    /**
     * Takes a 4-by-4 matrix and a vector with 3 entries, interprets the vector as a
     * direction, transforms that direction by the matrix, and returns the result;
     * assumes the transformation of 3-dimensional space represented by the matrix
     * is parallel-preserving, i.e. any combination of rotation, scaling and
     * translation, but not a perspective distortion. Returns a vector with 3
     * entries.
     * @param {m4.Mat4} m The matrix.
     * @param {v3.Vec3} v The direction.
     * @param {v3.Vec3} [dst] optional Vec3 to store result. If not passed a new one is created.
     * @return {v3.Vec3} The transformed direction.
     * @memberOf module:twgl/m4
     */
    export function transformDirection(m: m4.Mat4, v: v3.Vec3, dst?: v3.Vec3): v3.Vec3;
    /**
     * Takes a 4-by-4 matrix m and a vector v with 3 entries, interprets the vector
     * as a normal to a surface, and computes a vector which is normal upon
     * transforming that surface by the matrix. The effect of this function is the
     * same as transforming v (as a direction) by the inverse-transpose of m.  This
     * function assumes the transformation of 3-dimensional space represented by the
     * matrix is parallel-preserving, i.e. any combination of rotation, scaling and
     * translation, but not a perspective distortion.  Returns a vector with 3
     * entries.
     * @param {m4.Mat4} m The matrix.
     * @param {v3.Vec3} v The normal.
     * @param {v3.Vec3} [dst] The direction. If not passed a new one is created.
     * @return {v3.Vec3} The transformed normal.
     * @memberOf module:twgl/m4
     */
    export function transformNormal(m: m4.Mat4, v: v3.Vec3, dst?: v3.Vec3): v3.Vec3;
}