
export type WorkerDecoderDataType = { type: string; args: unknown[]; subject: "Console" | "Adarkroom" };

export default class WorkerDecoder {
    private valid = false;
    private args?: unknown[];
    private type?: string;
    decode(data: WorkerDecoderDataType): void {
        this.args = data.args;
        this.type = data.type;
        this.valid = true;
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
    getType() {
        if (this.type === undefined) {
            throw new Error("type is not defined")
        }
        return this.type;
    }
    getArgs() {
        if (this.args === undefined) {
            throw new Error("args is not defined")
        }
        return this.args;
    }
}
