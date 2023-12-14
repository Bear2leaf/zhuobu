export default interface UniformBufferObject {
    updateBuffer(arrays: Float32Array): void;
    bind(): void;
}