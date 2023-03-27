import WorkerCommand from "./WorkerCommand.js";

export default class CreateWindows extends WorkerCommand {

    public execute(worker: Worker): void {
        console.log("executed command [CreateWindows]");
        worker.postMessage("init_windows");
    }
}