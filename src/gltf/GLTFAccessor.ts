
const glTypeToTypedArrayMap = {
    '5120': Int8Array,    // gl.BYTE
    '5121': Uint8Array,   // gl.UNSIGNED_BYTE
    '5122': Int16Array,   // gl.SHORT
    '5123': Uint16Array,  // gl.UNSIGNED_SHORT
    '5124': Int32Array,   // gl.INT
    '5125': Uint32Array,  // gl.UNSIGNED_INT
    '5126': Float32Array, // gl.FLOAT
};

export type GLType = keyof typeof glTypeToTypedArrayMap;

// Given a GL type return the TypedArray needed
export function glTypeToTypedArray(type: GLType) {
    if (type in glTypeToTypedArrayMap) {
        return glTypeToTypedArrayMap[type];
    }
    throw new Error(`no key: ${type}`);
}
const accessorTypeToNumComponentsMap = {
    'SCALAR': 1,
    'VEC2': 2,
    'VEC3': 3,
    'VEC4': 4,
    'MAT2': 4,
    'MAT3': 9,
    'MAT4': 16,
};

export type GLTFAccessorType = keyof typeof accessorTypeToNumComponentsMap;

function accessorTypeToNumComponents(type: GLTFAccessorType) {
    if (type in accessorTypeToNumComponentsMap) {
        return accessorTypeToNumComponentsMap[type];
    }
    throw new Error(`no key: ${type}`);
}


export default class GLTFAccessor {
    private readonly bufferView: number;
    private readonly componentType: GLType;
    private readonly count: number;
    private readonly max: readonly number[];
    private readonly min: readonly number[];
    private readonly byteOffset?: number;
    private readonly type: GLTFAccessorType;
    constructor(accessor: GLTFAccessor) {
        this.bufferView = accessor.bufferView;
        this.componentType = accessor.componentType;
        this.count = accessor.count;
        this.max = accessor.max;
        this.min = accessor.min;
        this.byteOffset = accessor.byteOffset;
        this.type = accessor.type;
    }
    getBufferView() {
        return this.bufferView;
    }
    getComponentType() {
        return this.componentType;
    }
    getCount() {
        return this.count;
    }
    getMax() {
        return this.max;
    }
    getMin() {
        return this.min;
    }
    getByteOffset() {
        return this.byteOffset || 0;
    }
    getType() {
        return this.type;
    }
    getNumComponents() {
        return accessorTypeToNumComponents(this.type);
    }
}