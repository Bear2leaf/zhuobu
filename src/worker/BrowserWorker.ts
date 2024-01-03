import Worker from "./Worker.js";
export default class BrowserWorker extends Worker {
    constructor() {
        super();
        this.onMessage = console.log
        self.addEventListener("message", (event) => {
            if (this.onMessage === undefined) {
                throw new Error("onMessage is undefined");
            }
            this.onMessage(event.data);
        });
    }
    postMessage(data: WorkerResponse): void {
        self.postMessage(data);
    }
    
}