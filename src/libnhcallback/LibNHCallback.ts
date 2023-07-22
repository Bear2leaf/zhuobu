export interface LibNHCallback {
    execute(): void;
    decode(...args: unknown[]): void;
}