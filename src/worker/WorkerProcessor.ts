import AdarkroomEngine from "./AdarkroomEngine.js";


export default class WorkerProcessor {
    private readonly adarkroomEngine: AdarkroomEngine;
    constructor() {
        this.adarkroomEngine = new AdarkroomEngine(this);
    }
    getAdarkroomEngine(): AdarkroomEngine {
        return this.adarkroomEngine;
    }
    onMessage(data: {type: string, args: unknown[]}): void {
        console.debug("worker.onMessage", data);
        if (data.type === "Ping") {
            this.postMessage({type: "Pong", args: [1, 2, 3]});
        }
    }
    postMessage(data: {type: string, args: unknown[]}): void { throw new Error("Method not implemented.") };
}