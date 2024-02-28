import WorkerDevice from "../device/WorkerDevice.js";
import CdlodGrid from "../terrain/CdlodGrid.js";
import Terrain from "../terrain/Terrain.js";
import { IWorld, createWorld, defineDeserializer, defineSerializer } from "../third/bitecs/index.js";
export default class State {
    private readonly world = createWorld();
    private readonly state: StateData = {};
    private readonly systems: ((world: IWorld) => void)[] = [];
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
                })
                break;
            case "CreateTerrain":
                Object.assign(this.state, {
                    modelTranslation: [0, 0, 0],
                    objects: [
                        "terrain",
                        "terrainFBO"
                    ],
                    programs: [
                        "terrain",
                        "terrainFBO"
                    ],
                    textures: [
                        "diffuse",
                        "depth",
                        "normal",
                    ],
                    framebuffers: [
                        "terrainFBO"
                    ]
                })
                this.send({
                    type: "SendState",
                    broadcast: true,
                    args: [this.state]
                })
                break;
            case "TerrainCreated":
                const factory = Terrain.create();
                const gridFactory = CdlodGrid.create();
                this.send({
                    type: "SendState",
                    broadcast: true,
                    args: [{
                        attributes: {
                            "terrainFBO": factory.getAttributes(),
                            "terrain": gridFactory.getAttributes()
                        },
                        uniforms: {
                            "terrain": gridFactory.getUniforms()
                        },
                        instanceCounts: {
                            "terrain": gridFactory.getInstanceCount()
                        },
                        animation: true
                    }]
                })
                break;
        }
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
    send(data: WorkerResponse) {
        throw new Error("Abstract method.")
    }
}