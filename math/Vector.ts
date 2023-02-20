
export function flatten(vec4Array: Vec4[]): Float32Array {
    return vec4Array.reduce(function (prev, current, index) {
        prev[index * 4] = current.x;
        prev[index * 4 + 1] = current.y;
        prev[index * 4 + 2] = current.z;
        prev[index * 4 + 3] = current.w;
        return prev;
    }, new Float32Array(vec4Array.length * 4));
}


export function normalize(a: Vec3, dst?: Vec3) {
    dst = dst || new Vec3();

    const lenSq = a.x * a.x + a.y * a.y + a.z * a.z;
    const len = Math.sqrt(lenSq);
    if (len > 0.00001) {
        dst.x = a.x / len;
        dst.y = a.y / len;
        dst.z = a.z / len;
    } else {
        dst.x = 0;
        dst.y = 0;
        dst.z = 0;
    }

    return dst;
}
export function subtract(a: Vec3, b: Vec3, dst?: Vec3) {
    dst = dst || new Vec3();

    dst.x = a.x - b.x;
    dst.y = a.y - b.y;
    dst.z = a.z - b.z;

    return dst;
}

export function cross(a:Vec3, b:Vec3, dst?: Vec3) {
    dst = dst || new Vec3();
  
    const t1 = a.z * b.x - a.x * b.z;
    const t2 = a.x * b.y - a.y * b.x;
    dst.x = a.y * b.z - a.z * b.y;
    dst.y = t1;
    dst.z = t2;
  
    return dst;
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
    cross(ac: Vec4) {
        const t1 = this.z * ac.x - this.x * ac.z;
        const t2 = this.x * ac.y - this.y * ac.x;
        this.x = this.y * ac.z - this.z * ac.y;
        this.y = t1;
        this.z = t2;
        return this;
    }
    normalize() {
        const lenSq = this.x * this.x + this.y * this.y + this.z * this.z;
        const len = Math.sqrt(lenSq);
        if (len > 0.00001) {
            this.x /= len;
            this.y /= len;
            this.z /= len;
        } else {
            this.x = 0;
            this.y = 0;
            this.z = 0;
        }
        return this;
    }
    multiply(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        this.w *= scalar;
        return this;
    }
    set(x: number, y: number, z: number, w: number): void {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    add(vec4: Vec4) {
        this.x += vec4.x;
        this.y += vec4.y;
        this.z += vec4.z;
        this.w += vec4.w;
        return this;
    }
    subtract(vec4: Vec4) {
        this.x -= vec4.x;
        this.y -= vec4.y;
        this.z -= vec4.z;
        this.w -= vec4.w;
        return this;
    }
    lerp(vec4: Vec4, t: number) {
        return this.add(vec4).multiply(t);
    }
    clone() {
        return new Vec4(this.x, this.y, this.z, this.w);
    }
}

export class Vec3 extends Vec4 {
    constructor(x: number = 0, y: number = 0, z: number = 0) {
        super(x, y, z);
    }
}
export class Vec2 extends Vec4 {
    constructor(x: number = 0, y: number = 0) {
        super(x, y);
    }
}
