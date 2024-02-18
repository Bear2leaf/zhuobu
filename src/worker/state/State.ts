import WorkerDevice from "../WorkerDevice.js";
export default class State {
    readonly state: Record<string, string> = {};
    constructor(readonly device: WorkerDevice) {
        console.log("State Inited.")
    }
    init() {
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