import WorkerHandler from "./WorkerHandler.js";



export default class InitNHWindows extends WorkerHandler {
    operation(worker: Worker, argc :number, argvPtrPtr: number): void {
        worker.postMessage("InitNHWindows");
        super.operation(worker, argc, argvPtrPtr);
    }
}