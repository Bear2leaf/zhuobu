import WorkerDecoder from "../decoder/WorkerDecoder.js";
import InitDecoder from "../decoder/InitDecoder.js";
import Manager from "./Manager.js";
import ConsoleDecoder from "../decoder/ConsoleDecoder.js";


export default class WorkerManager extends Manager<WorkerDecoder> {
    addObjects(): void {
        [
            ConsoleDecoder,
            InitDecoder
        ].forEach((ctor) => {
            this.add(ctor);
        });
    }
    async load(): Promise<void> {
    }

    init(): void {
        this.getDevice().createWorker("worker/index.js", (worker: Worker, data: {type: string, args: unknown[]}) => {
            this.all().forEach(cb => cb.decode(worker, data));
        });
    }
    update(): void {
    }
}