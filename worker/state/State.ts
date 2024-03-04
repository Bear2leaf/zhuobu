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
            ["reflect", 1, "water"]
        ],
        framebuffers: [
            "terrainFBO",
            "waterFBO"
        ],
        textureFBOBindings: [
            ["terrainFBO", "diffuse", "depth", "normal"],
            ["waterFBO", "refract", "reflect"]
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
                        {
                            programName: "water",
                            eye: [0, 1, 3],
                            target: [0, 0, 0],
                            up: [0, 1, 0],
                            fieldOfViewYInRadians: Math.PI / 8,
                            aspect: 1,
                            zNear: 0.1,
                            zFar: 10,
                        },
                        {
                            programName: "sky",
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
                            ["terrainFBO", "terrainFBO", "terrainFBO", true],
                            ["sky", "sky", "waterFBO", true],
                            ["terrain", "terrain", "waterFBO", false],
                            ["sky", "sky", "", true],
                            ["terrain", "terrain", "", false],
                            ["water", "water", "", false],
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