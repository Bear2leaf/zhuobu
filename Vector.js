export function flatten(vec4Array) {
    return vec4Array.reduce(function (prev, current, index) {
        prev[index * 4] = current.x;
        prev[index * 4 + 1] = current.y;
        prev[index * 4 + 2] = current.z;
        prev[index * 4 + 3] = current.w;
        return prev;
    }, new Float32Array(vec4Array.length * 4));
}
export function normalize(a, dst) {
    dst = dst || new Vec3();
    const lenSq = a.x * a.x + a.y * a.y + a.z * a.z;
    const len = Math.sqrt(lenSq);
    if (len > 0.00001) {
        dst.x = a.x / len;
        dst.y = a.y / len;
        dst.z = a.z / len;
    }
    else {
        dst.x = 0;
        dst.y = 0;
        dst.z = 0;
    }
    return dst;
}
export function subtract(a, b, dst) {
    dst = dst || new Vec3();
    dst.x = a.x - b.x;
    dst.y = a.y - b.y;
    dst.z = a.z - b.z;
    return dst;
}
export function cross(a, b, dst) {
    dst = dst || new Vec3();
    const t1 = a.z * b.x - a.x * b.z;
    const t2 = a.x * b.y - a.y * b.x;
    dst.x = a.y * b.z - a.z * b.y;
    dst.y = t1;
    dst.z = t2;
    return dst;
}
export class Vec4 {
    constructor(x = 0, y = 0, z = 0, w = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    multiply(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        this.w *= scalar;
        return this;
    }
    add(vec4) {
        this.x += vec4.x;
        this.y += vec4.y;
        this.z += vec4.z;
        this.w += vec4.w;
        return this;
    }
    lerp(vec4, t) {
        return this.add(vec4).multiply(t);
    }
    clone() {
        return new Vec4(this.x, this.y, this.z, this.w);
    }
}
export class Vec3 extends Vec4 {
    constructor(x = 0, y = 0, z = 0) {
        super(x, y, z);
    }
}
export class Vec2 extends Vec4 {
    constructor(x = 0, y = 0) {
        super(x, y);
    }
}
//# sourceMappingURL=Vector.js.map