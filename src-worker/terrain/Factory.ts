export default interface Factory {
    create(): void;
    getAttributes(): unknown[];
}