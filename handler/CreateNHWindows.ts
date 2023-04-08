import WorkerHandler from "./WorkerHandler.js";



export default class CreateNHWindows extends WorkerHandler {
    operation(worker: Worker, type: number): void {
        worker.postMessage("CreateNHWindows");
        super.operation(worker, type);
    }
}