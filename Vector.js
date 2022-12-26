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
    clone() {
        return new Vec4(this.x, this.y, this.z, this.w);
    }
}
export class Vec2 extends Vec4 {
    constructor(x = 0, y = 0) {
        super(x, y);
    }
}
//# sourceMappingURL=Vector.js.map