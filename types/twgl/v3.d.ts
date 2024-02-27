declare module v3 {
    /**
     * A JavaScript array with 3 values or a Float32Array with 3 values.
     * When created by the library will create the default type which is `Float32Array`
     * but can be set by calling {@link v3.setDefaultType}.
     * @typedef {(number[]|Float32Array)} Vec3
     * @memberOf module:twgl/v3
     */
    export type Vec3 = number[] | Float32Array;
    /**
     * Sets the type this library creates for a Vec3
     * @param {constructor} ctor the constructor for the type. Either `Float32Array` or `Array`
     * @return {constructor} previous constructor for Vec3
     * @memberOf module:twgl/v3
     */
    export function setDefaultType(ctor: Function): Function;
    /**
     * Creates a vec3; may be called with x, y, z to set initial values.
     * @param {number} [x] Initial x value.
     * @param {number} [y] Initial y value.
     * @param {number} [z] Initial z value.
     * @return {v3.Vec3} the created vector
     * @memberOf module:twgl/v3
     */
    export function create(x?: number, y?: number, z?: number): v3.Vec3;
    /**
     * Adds two vectors; assumes a and b have the same dimension.
     * @param {v3.Vec3} a Operand vector.
     * @param {v3.Vec3} b Operand vector.
     * @param {v3.Vec3} [dst] vector to hold result. If not new one is created.
     * @return {v3.Vec3} A vector tha tis the sum of a and b.
     * @memberOf module:twgl/v3
     */
    export function add(a: v3.Vec3, b: v3.Vec3, dst?: v3.Vec3): v3.Vec3;
    /**
     * Subtracts two vectors.
     * @param {v3.Vec3} a Operand vector.
     * @param {v3.Vec3} b Operand vector.
     * @param {v3.Vec3} [dst] vector to hold result. If not new one is created.
     * @return {v3.Vec3} A vector that is the difference of a and b.
     * @memberOf module:twgl/v3
     */
    export function subtract(a: v3.Vec3, b: v3.Vec3, dst?: v3.Vec3): v3.Vec3;
    /**
     * Performs linear interpolation on two vectors.
     * Given vectors a and b and interpolation coefficient t, returns
     * a + t * (b - a).
     * @param {v3.Vec3} a Operand vector.
     * @param {v3.Vec3} b Operand vector.
     * @param {number} t Interpolation coefficient.
     * @param {v3.Vec3} [dst] vector to hold result. If not new one is created.
     * @return {v3.Vec3} The linear interpolated result.
     * @memberOf module:twgl/v3
     */
    export function lerp(a: v3.Vec3, b: v3.Vec3, t: number, dst?: v3.Vec3): v3.Vec3;
    /**
     * Performs linear interpolation on two vectors.
     * Given vectors a and b and interpolation coefficient vector t, returns
     * a + t * (b - a).
     * @param {v3.Vec3} a Operand vector.
     * @param {v3.Vec3} b Operand vector.
     * @param {v3.Vec3} t Interpolation coefficients vector.
     * @param {v3.Vec3} [dst] vector to hold result. If not new one is created.
     * @return {v3.Vec3} the linear interpolated result.
     * @memberOf module:twgl/v3
     */
    export function lerpV(a: v3.Vec3, b: v3.Vec3, t: v3.Vec3, dst?: v3.Vec3): v3.Vec3;
    /**
     * Return max values of two vectors.
     * Given vectors a and b returns
     * [max(a[0], b[0]), max(a[1], b[1]), max(a[2], b[2])].
     * @param {v3.Vec3} a Operand vector.
     * @param {v3.Vec3} b Operand vector.
     * @param {v3.Vec3} [dst] vector to hold result. If not new one is created.
     * @return {v3.Vec3} The max components vector.
     * @memberOf module:twgl/v3
     */
    export function max(a: v3.Vec3, b: v3.Vec3, dst?: v3.Vec3): v3.Vec3;
    /**
     * Return min values of two vectors.
     * Given vectors a and b returns
     * [min(a[0], b[0]), min(a[1], b[1]), min(a[2], b[2])].
     * @param {v3.Vec3} a Operand vector.
     * @param {v3.Vec3} b Operand vector.
     * @param {v3.Vec3} [dst] vector to hold result. If not new one is created.
     * @return {v3.Vec3} The min components vector.
     * @memberOf module:twgl/v3
     */
    export function min(a: v3.Vec3, b: v3.Vec3, dst?: v3.Vec3): v3.Vec3;
    /**
     * Multiplies a vector by a scalar.
     * @param {v3.Vec3} v The vector.
     * @param {number} k The scalar.
     * @param {v3.Vec3} [dst] vector to hold result. If not new one is created.
     * @return {v3.Vec3} The scaled vector.
     * @memberOf module:twgl/v3
     */
    export function mulScalar(v: v3.Vec3, k: number, dst?: v3.Vec3): v3.Vec3;
    /**
     * Divides a vector by a scalar.
     * @param {v3.Vec3} v The vector.
     * @param {number} k The scalar.
     * @param {v3.Vec3} [dst] vector to hold result. If not new one is created.
     * @return {v3.Vec3} The scaled vector.
     * @memberOf module:twgl/v3
     */
    export function divScalar(v: v3.Vec3, k: number, dst?: v3.Vec3): v3.Vec3;
    /**
     * Computes the cross product of two vectors; assumes both vectors have
     * three entries.
     * @param {v3.Vec3} a Operand vector.
     * @param {v3.Vec3} b Operand vector.
     * @param {v3.Vec3} [dst] vector to hold result. If not new one is created.
     * @return {v3.Vec3} The vector of a cross b.
     * @memberOf module:twgl/v3
     */
    export function cross(a: v3.Vec3, b: v3.Vec3, dst?: v3.Vec3): v3.Vec3;
    /**
     * Computes the dot product of two vectors; assumes both vectors have
     * three entries.
     * @param {v3.Vec3} a Operand vector.
     * @param {v3.Vec3} b Operand vector.
     * @return {number} dot product
     * @memberOf module:twgl/v3
     */
    export function dot(a: v3.Vec3, b: v3.Vec3): number;
    /**
     * Computes the length of vector
     * @param {v3.Vec3} v vector.
     * @return {number} length of vector.
     * @memberOf module:twgl/v3
     */
    export function length(v: v3.Vec3): number;
    /**
     * Computes the square of the length of vector
     * @param {v3.Vec3} v vector.
     * @return {number} square of the length of vector.
     * @memberOf module:twgl/v3
     */
    export function lengthSq(v: v3.Vec3): number;
    /**
     * Computes the distance between 2 points
     * @param {v3.Vec3} a vector.
     * @param {v3.Vec3} b vector.
     * @return {number} distance between a and b
     * @memberOf module:twgl/v3
     */
    export function distance(a: v3.Vec3, b: v3.Vec3): number;
    /**
     * Computes the square of the distance between 2 points
     * @param {v3.Vec3} a vector.
     * @param {v3.Vec3} b vector.
     * @return {number} square of the distance between a and b
     * @memberOf module:twgl/v3
     */
    export function distanceSq(a: v3.Vec3, b: v3.Vec3): number;
    /**
     * Divides a vector by its Euclidean length and returns the quotient.
     * @param {v3.Vec3} a The vector.
     * @param {v3.Vec3} [dst] vector to hold result. If not new one is created.
     * @return {v3.Vec3} The normalized vector.
     * @memberOf module:twgl/v3
     */
    export function normalize(a: v3.Vec3, dst?: v3.Vec3): v3.Vec3;
    /**
     * Negates a vector.
     * @param {v3.Vec3} v The vector.
     * @param {v3.Vec3} [dst] vector to hold result. If not new one is created.
     * @return {v3.Vec3} -v.
     * @memberOf module:twgl/v3
     */
    export function negate(v: v3.Vec3, dst?: v3.Vec3): v3.Vec3;
    /**
     * Copies a vector.
     * @param {v3.Vec3} v The vector.
     * @param {v3.Vec3} [dst] vector to hold result. If not new one is created.
     * @return {v3.Vec3} A copy of v.
     * @memberOf module:twgl/v3
     */
    export function copy(v: v3.Vec3, dst?: v3.Vec3): v3.Vec3;
    /**
     * Multiplies a vector by another vector (component-wise); assumes a and
     * b have the same length.
     * @param {v3.Vec3} a Operand vector.
     * @param {v3.Vec3} b Operand vector.
     * @param {v3.Vec3} [dst] vector to hold result. If not new one is created.
     * @return {v3.Vec3} The vector of products of entries of a and
     *     b.
     * @memberOf module:twgl/v3
     */
    export function multiply(a: v3.Vec3, b: v3.Vec3, dst?: v3.Vec3): v3.Vec3;
    /**
     * Divides a vector by another vector (component-wise); assumes a and
     * b have the same length.
     * @param {v3.Vec3} a Operand vector.
     * @param {v3.Vec3} b Operand vector.
     * @param {v3.Vec3} [dst] vector to hold result. If not new one is created.
     * @return {v3.Vec3} The vector of quotients of entries of a and
     *     b.
     * @memberOf module:twgl/v3
     */
    export function divide(a: v3.Vec3, b: v3.Vec3, dst?: v3.Vec3): v3.Vec3;
}