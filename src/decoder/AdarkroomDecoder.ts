import WorkerDecoder from "./WorkerDecoder.js";

export default class AdarkroomDecoder extends WorkerDecoder {
    decode(data: { type: string; args: unknown[]; subject: string }): void {
        this.setValid(data.subject === "Adarkroom")
    }
    execute(worker: Worker): void {
        
    }
}