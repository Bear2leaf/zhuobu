import WorkerDecoder, { WorkerDecoderDataType } from "./WorkerDecoder.js";

export default class ConsoleDecoder extends WorkerDecoder {
    decode(data: WorkerDecoderDataType): void {
        super.decode(data);
        if (this.getValid()) {
            this.setValid(data.subject === 'Console');
        }
    }
    execute(worker: Worker): void {
        if (this.getValid()) {
            console.debug(this.getType(), this.getArgs())
        }
    }
}