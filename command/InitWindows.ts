import WorkerCommand from "./WorkerCommand.js";

export default class InitWindows extends WorkerCommand {

    public execute(worker: Worker): void {
        console.log("executed command [InitWindows]");
        worker.postMessage("init_windows");
    }
}