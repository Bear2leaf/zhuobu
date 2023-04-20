
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
    private readonly componentType: number;
    private readonly count: number;
    private readonly max: readonly number[];
    private readonly min: readonly number[];
    private readonly type: GLTFAccessorType;
    constructor(bufferView: number, componentType: number, count: number, max: number[], min: number[], type: GLTFAccessorType) {
        this.bufferView = bufferView;
        this.componentType = componentType;
        this.count = count;
        this.max = max;
        this.min = min;
        this.type = type;
    }
}