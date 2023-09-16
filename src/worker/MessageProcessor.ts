import Worker from "./Worker.js";

export type WorkerResponseType = "Pong" | "WorkerInit";
export type WorkerRequestType = "Ping";
export type WorkerResponse = { type: WorkerResponseType; args: unknown[]; };
export type WorkerRequest = { type: WorkerRequestType; args: unknown[]; };

export default class MessageProcessor {
    private valid = false;
    private args?: unknown[];
    private type?: string;
    decode(data: WorkerRequest): void {
        this.args = data.args;
        this.type = data.type;
        this.valid = true;
    }
    execute(processor: Worker): void {
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
