import WorkerProcessor from "../WorkerProcessor.js";

export type MessageDecoderDataType = { type: string; args: unknown[]; subject: "Console" | "Adarkroom" };

export default class MessageDecoder {
    private valid = false;
    private args?: unknown[];
    private type?: string;
    decode(data: MessageDecoderDataType): void {
        this.args = data.args;
        this.type = data.type;
        this.valid = true;
    }
    execute(processor: WorkerProcessor): void {
        throw new Error("Abstract Method.")
    }
    setValid(valid: boolean) {
        this.valid = valid;
    }
    getValid() {
        return this.valid;
    }
    getArgs() {
        if (this.args === undefined) {
            throw new Error("args is not defined")
        }
        return this.args;
    }
    getType() {
        if (this.type === undefined) {
            throw new Error("type is not defined")
        }
        return this.type;
    }
}
