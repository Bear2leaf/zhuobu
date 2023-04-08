import WorkerHandler from "./WorkerHandler.js";
import InitNHWindows from "./InitNHWindows.js";
import CreateNHWindows from "./CreateNHWindows.js";
import { ShimCallbackName } from "./ShimCallbackName.js";

export default class MsgDispatcher extends WorkerHandler {
    private readonly nextHandlerMap: ReadonlyMap<string, WorkerHandler>;
    constructor() {
        super();
        const nextHandlerSet = new Map<string, WorkerHandler>();
        nextHandlerSet.set(ShimCallbackName.ShimInitNHWindows, new InitNHWindows());
        nextHandlerSet.set(ShimCallbackName.ShimCreateNHWindow, new CreateNHWindows());
        this.nextHandlerMap = nextHandlerSet;

    }
    operation(worker: Worker, ...args: any[]): void {
        const funcName = args.shift();
        console.log(`begin handle [${funcName}], args:`, ...args)
        this.setNextHandler(this.nextHandlerMap.get(funcName));
        super.operation(worker, ...args);
        console.log(`end handle [${funcName}]`)
    }
}