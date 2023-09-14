import WorkerDecoder, { WorkerDecoderDataType } from "./WorkerDecoder.js";

export default class ConsoleDecoder extends WorkerDecoder {
    private args: unknown[] = [];
    private type?: string;
    decode(data: WorkerDecoderDataType): void {
        this.setValid(data.subject === 'Console');
        this.args = data.args;
        this.type = data.type;
    }
    getType() {
        if (this.type === undefined) {
            throw new Error("type is not defined")
        }
        return this.type;
    }
    execute(worker: Worker): void {
        if (this.getValid()) {
            console.debug(this.type, this.args)
        }
    }
}