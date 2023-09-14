import WorkerProcessor from "./WorkerProcessor.js";
export default class BrowserProcessor extends WorkerProcessor {
    constructor() {
        super();
        self.addEventListener("message", (event) => {
            this.onMessage(event.data);
        });
    }
    postMessage(data: {type: string, args: unknown[]}): void {
        self.postMessage(data);
    }
    
}