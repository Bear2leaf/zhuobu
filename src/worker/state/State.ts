import WorkerDevice from "../device/WorkerDevice.js";
import CdlodGrid from "../terrain/CdlodGrid.js";
import Terrain from "../terrain/Terrain.js";
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
            case "RequestLoadStart":
                this.send({
                    type: "SendCreateObjects",
                    args: [["terrain", "terrainFBO"], ["terrain", "terrainFBO"], ["diffuse", "depth", "normal"]],
                    broadcast: true
                })
                break;
            case "RequestObjectCreated":
                this.send({
                    type: "SendObjectCreated",
                    broadcast: true
                })
                break;
        }
    }
    requestTerrain() {
        const factory = Terrain.create();
        const gridFactory = CdlodGrid.create();
        this.send({
            type: "SendAttributes",
            args: ["terrainFBO", ...factory.getAttributes()],
            broadcast: true
        })
        this.send({
            type: "SendAttributes",
            args: ["terrain", ...gridFactory.getAttributes()],
            broadcast: true
        })
        this.send({
            type: "SendUniforms",
            args: ["terrain", ...gridFactory.getUniforms()],
            broadcast: true
        })
        this.send({
            type: "SendInstanceCount",
            args: ["terrain", gridFactory.getInstanceCount()],
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