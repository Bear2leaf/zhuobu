import WorkerDecoder, { WorkerDecoderDataType } from "../decoder/WorkerDecoder.js";
import InitDecoder from "../decoder/InitDecoder.js";
import Manager from "./Manager.js";
import ConsoleDecoder from "../decoder/ConsoleDecoder.js";
import AdarkroomDecoder from "../decoder/AdarkroomDecoder.js";


export default class WorkerManager extends Manager<WorkerDecoder> {
    addObjects(): void {
        [
            ConsoleDecoder,
            InitDecoder,
            AdarkroomDecoder
        ].forEach((ctor) => {
            this.add(ctor);
        });
    }
    async load(): Promise<void> {
    }

    init(): void {
        this.getDevice().createWorker("worker/index.js", (worker: Worker, data: WorkerDecoderDataType) => {
            this.all().forEach(cb => {
                cb.decode(data);
                cb.execute(worker);
            });
        });
    }
    update(): void {
    }
}