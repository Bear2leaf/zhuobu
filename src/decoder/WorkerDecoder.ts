
export type WorkerDecoderDataType = { type: string; args: unknown[]; subject: "Console" | "Adarkroom" };

export default class WorkerDecoder {
    private valid = false;
    decode(data: WorkerDecoderDataType): void {
        throw new Error("Abstract Method.")
    }
    execute(worker: Worker): void {
        throw new Error("Abstract Method.")
    }
    setValid(valid: boolean) {
        this.valid = valid;
    }
    getValid() {
        return this.valid;
    }
}
