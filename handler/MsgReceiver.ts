import WorkerHandler from "./WorkerHandler.js";
import ShimInitNHWindows from "./ShimInitNHWindows.js";
import ShimCreateNHWindows from "./ShimCreateNHWindows.js";

export default class MsgReceiver extends WorkerHandler {
    private readonly nextHandlerMap: ReadonlyMap<string,  WorkerHandler>;
    constructor() {
        super();
        const nextHandlerSet = new Map<string, WorkerHandler>();
        nextHandlerSet.set('shim_init_nhwindows', new ShimInitNHWindows());
        nextHandlerSet.set('shim_create_nhwindow', new ShimCreateNHWindows());
        this.nextHandlerMap= nextHandlerSet;

    }
    operation(worker: Worker, ...args: any[]): void {
        const funcName = args.shift();
        console.log(`begin handle [${funcName}], args:`, ...args)
        this.setNextHandler(this.nextHandlerMap.get(funcName));
        super.operation(worker, ...args);
        console.log(`end handle [${funcName}]`)
    }
}