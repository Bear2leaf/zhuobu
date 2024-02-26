import WorkerDevice from "../device/WorkerDevice.js";
import GridFactory from "../terrain/GridFactory.js";
import TerrainFactory from "../terrain/TerrainFactory.js";
import { createWorld } from "../third/bitecs/index.js";
export default class State {
    private readonly world = createWorld();
    readonly state: StateData = {};
    constructor(readonly device: WorkerDevice) {
        console.log("State Inited.")
    }
    init() {
        this.device.emit({
            type: "WorkerInit"
        })
        this.send({
            type: "SendState",
            broadcast: true,
            args: [{
                modelTranslation: [0, 0, 0]
            }]
        })
    }
    onRequest(data: WorkerRequest) {
        switch (data.type) {
            case "SyncState":
                if (data.args) {
                    Object.assign(this.state, data.args[0]);
                }
                this.send({
                    type: "SendState",
                    broadcast: true,
                    args: [this.state]
                });
                break;
            case "GetState":
                this.sync();
                break;
            case "RequestTerrain":
                this.requestTerrain();
                break;
        }
    }
    requestTerrain() {
        const factory = new TerrainFactory;
        const gridFactory = new GridFactory;
        gridFactory.create();
        factory.create();
        this.send({
            type: "SendAttributes",
            args: ["TerrainFBO", ...factory.getAttributes()],
            broadcast: true
        })
        this.send({
            type: "SendAttributes",
            args: ["Terrain", ...gridFactory.getAttributes()],
            broadcast: true
        })
        this.send({
            type: "SendUniforms",
            args: ["Terrain", ...gridFactory.getUniforms()],
            broadcast: true
        })
    }
    onResponse(data: WorkerResponse) {
        switch (data.type) {
            case "SendState":
                if (data.args) {
                    Object.assign(this.state, data.args[0]);
                }
                break;
        }
    }
    changeModelTranslation(translation: [number, number, number]): void {
        this.send({
            type: "SendState",
            broadcast: true,
            args: [{ modelTranslation: translation }]
        })
    }
    sync() {
        this.send({
            type: "RequestSync",
            broadcast: true
        });
    }
    send(data: WorkerResponse) {
        console.log("State.Send", data);
    }
}