import WorkerProcessor from "./WorkerProcessor.js";

export default class AdarkroomEngine {
    constructor(private readonly workerProcessor: WorkerProcessor) {
        console.debug("AdarkroomEngine", "is inited!");
    }
}