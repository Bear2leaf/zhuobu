import WorkerDecoder, { WorkerDecoderDataType } from "./WorkerDecoder.js";

export default class AdarkroomDecoder extends WorkerDecoder {
    decode(data: WorkerDecoderDataType): void {
        super.decode(data)
        if (this.getValid()) {
            this.setValid(data.subject === "Adarkroom")
        }
    }
    execute(worker: Worker): void {
        if (this.getValid()) {
            console.debug(`Receiving type = ${this.getType()}, args = ${this.getArgs()}`)
        }
    }
}