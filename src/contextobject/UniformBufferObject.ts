
export enum UniformBinding {
    Shadow = 6,
    Material = 5,
    Light = 4,
    Pick = 3,
    SDF = 2,
    Model = 1,
    Camera = 0,
}
export default interface UniformBufferObject {
    updateBuffer(arrays: Float32Array): void;
    bind(index: UniformBinding): void;
}