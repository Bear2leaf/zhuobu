import WorkerDevice from "../device/WorkerDevice.js";
import GridFactory from "../terrain/GridFactory.js";
import TerrainFactory from "../terrain/TerrainFactory.js";
import { createWorld } from "../third/bitecs/index.js";
export default class State {
    private readonly world = createWorld();
    readonly state: Record<string, string> = {};
    constructor(readonly device: WorkerDevice) {
        console.log("State Inited.")
    }
    init() {
        this.device.emit({
            type: "WorkerInit"
        })
        this.send({
            type: "SendModelTranslation",
            broadcast: true,
            args: [[0, 0, 0]]
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
            case "ChangeModelTranslation":
                this.changeModelTranslation(data.args[0]);
                break;
        }
    }
    requestTerrain() {
        const factory = new TerrainFactory;
        const gridFactory = new GridFactory;
        gridFactory.create();
        factory.create();
        {
            const attributes = factory.getAttributes();
            let i = 0;
            this.send({
                type: "SendAttrBatchBegin",
                args: ["TerrainFBO"],
                broadcast: true
            })
            while (i < attributes.length) {
                this.send({
                    type: "SendAttrBatch",
                    args: ["TerrainFBO", attributes[i++]],
                    broadcast: true
                })
            }
            this.send({
                type: "SendAttrBatchEnd",
                args: ["TerrainFBO"],
                broadcast: true
            })
        }
        {
            const attributes = gridFactory.getAttributes();
            let i = 0;
            this.send({
                type: "SendAttrBatchBegin",
                args: ["Terrain"],
                broadcast: true
            })
            while (i < attributes.length) {
                this.send({
                    type: "SendAttrBatch",
                    args: ["Terrain", attributes[i++]],
                    broadcast: true
                })
            }
            this.send({
                type: "SendAttrBatchEnd",
                args: ["Terrain"],
                broadcast: true
            })
        }
        this.send({
            type: "SendTerrainUniforms",
            args: gridFactory.getUniforms(),
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
            type: "SendModelTranslation",
            broadcast: true,
            args: [translation]
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