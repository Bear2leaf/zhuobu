import { GLType } from "./GLTF.js";

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