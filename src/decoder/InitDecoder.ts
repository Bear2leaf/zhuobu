import ConsoleDecoder from "./ConsoleDecoder.js";
import WorkerDecoder, { WorkerDecoderDataType } from "./WorkerDecoder.js";

export default class InitDecoder extends ConsoleDecoder {
    decode(data: WorkerDecoderDataType): void {
        super.decode(data);
        if (this.getValid()) {
            this.setValid(this.getType() === 'WorkerInit')
        }
    }
    execute(worker: Worker): void {
        super.execute(worker);
        if (this.getValid()) {
            worker.postMessage({ type: "Ping", args: [4, 5, 6], subject: "Console" })
        }
    }
}