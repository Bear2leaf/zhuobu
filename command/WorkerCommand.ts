
export default class WorkerCommand {
    public execute(worker: Worker): void {
        throw new Error("Abstract method!");
    }
}