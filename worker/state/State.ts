import WorkerDevice from "../device/WorkerDevice.js";
import CdlodGrid from "../terrain/CdlodGrid.js";
import Sky from "../terrain/Sky.js";
import Terrain from "../terrain/Terrain.js";
import Water from "../terrain/Water.js";
export default class State {
    private readonly state: StateData = {
        objects: [
            "terrainFBO",
            "terrain",
            "sky",
            "water"
        ],
        programs: [
            "terrain",
            "terrainFBO",
            "sky",
            "water"
        ],
        textures: [
            ["diffuse", 0, "terrain"],
            ["depth", 1, "terrain"],
            ["normal", 2, "terrain"],
            ["refract", 0, "water"],
            ["reflect", 1, "water"],
            ["waterDepth", 2, "water"]
        ],
        framebuffers: [
            "terrainFBO",
            "refractFBO",
            "reflectFBO"
        ],
        cameras: [
            {
                name: "refract",
                eye: [0, 0.3, 1.5],
                target: [0, 0, 0],
                up: [0, 1, 0],
                fieldOfViewYInRadians: Math.PI / 8,
                zNear: 0.1,
                zFar: 10,
            }, {
                name: "reflect",
                eye: [0, -0.3, 1.5],
                target: [0, 0, 0],
                up: [0, 1, 0],
                fieldOfViewYInRadians: Math.PI / 8,
                zNear: 0.1,
                zFar: 10,
            },
        ],
        textureFBOBindings: [
            ["terrainFBO", "diffuse", "depth", "normal"],
            ["refractFBO", "refract", "waterDepth"],
            ["reflectFBO", "reflect", "waterDepth"]
        ],
    };
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
                const waterFactory = Water.create();
                this.send({
                    type: "SendState",
                    broadcast: true,
                    args: [{
                        modelTranslation: [0, 0, 0],
                        updateCalls: [
                            "rotateTerrain"
                        ]
                        ,
                        attributes: {
                            "terrainFBO": factory.getAttributes(),
                            "terrain": gridFactory.getAttributes(),
                            "sky": skyFactory.getAttributes(),
                            "water": waterFactory.getAttributes()
                        },
                        uniforms: {
                            "terrain": gridFactory.getUniforms(),
                            "sky": skyFactory.getUniforms(),
                            "water": waterFactory.getUniforms(),
                        },
                        instanceCounts: {
                            "terrain": gridFactory.getInstanceCount()
                        },
                        renderCalls: [
                            ["terrainFBO", "terrainFBO", "terrainFBO", "terrainFBO", true],
                            ["sky", "sky", "refractFBO", "refract", true],
                            ["terrain", "terrain", "refractFBO", "refract", false],
                            ["sky", "sky", "reflectFBO", "reflect", true],
                            ["terrain", "terrain", "reflectFBO", "reflect", false],
                            ["sky", "sky", "", "refract", true],
                            ["terrain", "terrain", "", "refract", false],
                            ["water", "water", "", "refract", false],
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