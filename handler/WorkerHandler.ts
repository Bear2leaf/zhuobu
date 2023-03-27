
export default class WorkerHandler {
    private nextHandler?: WorkerHandler;
    protected setNextHandler(nextHandler?: WorkerHandler): void {
        this.nextHandler = nextHandler;
    }

    operation(worker: Worker, ...args: any[]): void {
        this.nextHandler?.operation(worker, ...args);
    }

}