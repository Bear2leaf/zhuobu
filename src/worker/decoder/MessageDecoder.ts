import WorkerProcessor from "../WorkerProcessor.js";

export type MessageDecoderDataType = { type: string; args: unknown[]; subject: "Console" | "Adarkroom" };

export default class MessageDecoder {
    private valid = false;
    decode(data: MessageDecoderDataType): void {
        throw new Error("Abstract Method.")
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
}
