export default interface Scene {
    load(): Promise<void>;
    init(): void;
    tick(): void;
}