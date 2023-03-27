import InitWindows from "../command/InitWindows.js";
import WorkerHandler from "./WorkerHandler.js";



export default class ShimInitNHWindows extends WorkerHandler {
    operation(worker: Worker, ...args: any[]): void {
        const command = new InitWindows();
        command.execute(worker);
        super.operation(worker, ...args);
    }
}