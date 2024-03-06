import WorkerDevice from "../device/WorkerDevice.js";
import CdlodGrid from "../terrain/CdlodGrid.js";
import Sky from "../terrain/Sky.js";
import Terrain from "../terrain/Terrain.js";
import Water from "../terrain/Water.js";
export default class State {
    private readonly textureSize = 2048;
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
            ["diffuse", 0, "terrain", { width: this.textureSize, height: this.textureSize }],
            ["normal", 1, "terrain", { width: this.textureSize, height: this.textureSize }],
            ["depth", 2, "terrain", {width: this.textureSize, height: this.textureSize}],
            ["refract", 0, "water", { width: 0, height: 0 }],
            ["reflect", 1, "water", { width: 0, height: 0 }],
            ["waterDepth", 2, "water", { width: 0, height: 0 }]
        ],
        framebuffers: [
            "terrainFBO",
            "refractFBO",
            "reflectFBO"
        ],
        cameras: [
            {
                name: "refract",
                eye: [0, 0.3, 1],
                target: [0, 0, 0],
                up: [0, 1, 0],
                fieldOfViewYInRadians: Math.PI / 8,
                zNear: 0.1,
                zFar: 10,
            }, {
                name: "reflect",
                eye: [0, -0.3, 1],
                target: [0, 0, 0],
                up: [0, 1, 0],
                fieldOfViewYInRadians: Math.PI / 8,
                zNear: 0.1,
                zFar: 10,
            },
        ],
        textureFBOBindings: [
            ["terrainFBO", "diffuse", "normal", "depth"],
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
                        ],
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
                            ["terrainFBO", "terrainFBO", { width: this.textureSize, height: this.textureSize }, "terrainFBO", "terrainFBO", true],
                            ["sky", "sky", { width: 0, height: 0 }, "refractFBO", "refract", true],
                            ["terrain", "terrain", { width: 0, height: 0 }, "refractFBO", "refract", false],
                            ["sky", "sky", { width: 0, height: 0 }, "reflectFBO", "reflect", true],
                            ["terrain", "terrain", { width: 0, height: 0 }, "reflectFBO", "reflect", false],
                            ["sky", "sky", { width: 0, height: 0 }, "", "refract", true],
                            ["terrain", "terrain", { width: 0, height: 0 }, "", "refract", false],
                            ["water", "water", { width: 0, height: 0 }, "", "refract", false],
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