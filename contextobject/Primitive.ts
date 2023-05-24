export enum PrimitiveType {
    POINTS = 0x0000,
    LINES = 0x0001,
    TRIANGLES = 0x0003,
}
export default interface Primitive {
    getMode(): number;
}