import WorkerDevice from "./WorkerDevice.js";
import { createWorld } from "./third/bitecs/index.js";
export default class State {
    private  readonly world = createWorld();
    readonly state: Record<string, string> = {};
    constructor(readonly device: WorkerDevice) {
        console.log("State Inited.")
    }
    init() {
        console.log(this.world)
        this.device.emit({
            type: "WorkerInit"
        })
    }
    decode(data: WorkerRequest) {
        switch (data.type) {
            case "SyncState":
                if (data.args) {
                    this.set(data.args[0]);
                }
                this.get();
                break;
            case "GetState":
                this.sync();
                break;
        }
    }
    set(value: Record<string, string>): void {
        Object.assign(this.state, value);
    }
    get(): void{
        console.log("State.Get: ", this.state);
    }
    sync(): void {
        console.log("State.Sync");
    }
}