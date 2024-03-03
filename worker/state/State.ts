import WorkerDevice from "../device/WorkerDevice.js";
import CdlodGrid from "../terrain/CdlodGrid.js";
import Sky from "../terrain/Sky.js";
import Terrain from "../terrain/Terrain.js";
import { IWorld, createWorld, defineDeserializer, defineSerializer } from "../third/bitecs/index.js";
export default class State {
    private readonly world = createWorld();
    private readonly state: StateData = {
        objects: [
            "terrain",
            "terrainFBO",
            "sky"
        ],
        programs: [
            "terrain",
            "terrainFBO",
            "sky"
        ],
        textures: [
            "diffuse",
            "depth",
            "normal",
        ],
        framebuffers: [
            "terrainFBO"
        ]
    };
    private readonly systems: ((world: IWorld) => void)[] = [];
    constructor(readonly device: WorkerDevice) {
        console.log("State Inited.")
    }
    init() {
        this.send({
            type: "SendState",
            broadcast: true,
            args: [this.state]
        })
    }
    onRequest(data: WorkerRequest) {
        switch (data.type) {
            case "SyncState":
                if (data.args) {
                    Object.assign(this.state, data.args[0]);
                    this.send({
                        type: "SendState",
                        broadcast: true,
                        args: data.args
                    })
                } else {

                    this.send({
                        type: "SendState",
                        broadcast: true,
                        args: [this.state]
                    })
                }
                break;
            case "EngineLoaded":
                const factory = Terrain.create();
                const gridFactory = CdlodGrid.create();
                const skyFactory = Sky.create();
                this.send({
                    type: "SendState",
                    broadcast: true,
                    args: [{
                        modelTranslation: [0, 0, 0],
                        cameras: [{
                            programName: "terrain",
                            eye: [0, 1, 3],
                            target: [0, 0, 0],
                            up: [0, 1, 0],
                            fieldOfViewYInRadians: Math.PI / 8,
                            aspect: 1,
                            zNear: 0.1,
                            zFar: 10,
                        },
                        ],
                        updateCalls: [
                            "rotateTerrain"
                        ]
                        ,
                        attributes: {
                            "terrainFBO": factory.getAttributes(),
                            "terrain": gridFactory.getAttributes(),
                            "sky": skyFactory.getAttributes()
                        },
                        uniforms: {
                            "terrain": gridFactory.getUniforms(),
                            "sky": skyFactory.getUniforms()
                        },
                        instanceCounts: {
                            "terrain": gridFactory.getInstanceCount()
                        },
                        renderCalls: [
                            ["terrainFBO", "terrainFBO", "terrainFBO", []],
                            ["sky", "sky", "", []],
                            ["terrain", "terrain", "", []],
                        ],
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