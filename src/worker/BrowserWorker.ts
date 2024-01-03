import Worker from "./Worker.js";
export default class BrowserWorker extends Worker {
    constructor() {
        super();
        self.addEventListener("message", (event) => {
            this.onMessage(event.data);
        });
    }
    postMessage(data: WorkerResponse): void {
        self.postMessage(data);
    }
    
}