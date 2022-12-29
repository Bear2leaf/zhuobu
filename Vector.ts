
export function flatten(vec4Array: Vec4[]): Float32Array {
    return vec4Array.reduce(function (prev, current, index) {
        prev[index * 4] = current.x;
        prev[index * 4 + 1] = current.y;
        prev[index * 4 + 2] = current.z;
        prev[index * 4 + 3] = current.w;
        return prev;
    }, new Float32Array(vec4Array.length * 4));
}
export class Vec4 {
    x: number;
    y: number;
    z: number;
    w: number;
    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    multiply(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        this.w *= scalar;
        return this;
    }
    add(vec4: Vec4) {
        this.x += vec4.x;
        this.y += vec4.y;
        this.z += vec4.z;
        this.w += vec4.w;
        return this;
    }
    lerp(vec4: Vec4, t: number) {
        return this.add(vec4).multiply(t);
    }
    clone() {
        return new Vec4(this.x, this.y, this.z, this.w);
    }
}

export class Vec2 extends Vec4 {
    constructor(x: number = 0, y: number = 0) {
        super(x, y);
    }
}
