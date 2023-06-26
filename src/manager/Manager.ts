
export default interface Manager {
    load(): Promise<void>;
    init(): void;
    tick(): void;
}