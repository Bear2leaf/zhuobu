export default interface Scene {
    load(): Promise<void>;
    init(): void;
    update(): void;
}