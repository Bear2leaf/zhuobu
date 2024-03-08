import WorkerDevice from "../device/WorkerDevice.js";
import Sky from "../terrain/Sky.js";
import Terrain from "../terrain/Terrain.js";
import TerrainGrid from "../terrain/TerrainGrid.js";
import Water from "../terrain/Water.js";
export default class State {
    private readonly terrainTextureSize = 512;
    private readonly waterTextureSize = 256;
    private readonly state: StateData = {
        objects: [
            "terrainFBO",
            "terrain",
            "sky",
            "water"
        ],
        programs: [
            "terrainGrid",
            "terrainFBO",
            "sky",
            "water"
        ],
        textures: [
            ["diffuse", 0, "terrainGrid", this.terrainTextureSize],
            ["depth", 1, "terrainGrid", this.terrainTextureSize],
            ["refract", 0, "water", this.waterTextureSize],
            ["reflect", 1, "water", this.waterTextureSize],
            ["waterDepth", 2, "water", this.waterTextureSize]
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
                fieldOfViewYInRadians: Math.PI / 4,
                zNear: 0.1,
                zFar: 10,
            }, {
                name: "reflect",
                eye: [0, -0.3, 1],
                target: [0, 0, 0],
                up: [0, 1, 0],
                fieldOfViewYInRadians: Math.PI / 4,
                zNear: 0.1,
                zFar: 10,
            },
        ],
        textureFBOBindings: [
            ["terrainFBO", "diffuse", "depth"],
            ["refractFBO", "refract", "waterDepth"],
            ["reflectFBO", "reflect"]
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
                const gridFactory = TerrainGrid.create();
                const skyFactory = Sky.create();
                const waterFactory = Water.create();
                this.send({
                    type: "SendState",
                    broadcast: true,
                    args: [{
                        modelTranslation: [0, -0.005, 0],
                        cameras: this.state.cameras,
                        updateCalls: [
                            "rotateTerrain"
                        ],
                        attributes: {
                            "terrainFBO": factory.getAttributes(),
                            "terrainGrid": gridFactory.getAttributes(),
                            "sky": skyFactory.getAttributes(),
                            "water": waterFactory.getAttributes()
                        },
                        uniforms: {
                            "terrainGrid": gridFactory.getUniforms(),
                            "sky": skyFactory.getUniforms(),
                            "water": waterFactory.getUniforms(),
                        },
                        instanceCounts: {
                        },
                        renderCalls: [
                            ["terrainFBO", "terrainFBO", "terrainFBO", "terrainFBO", true, this.terrainTextureSize],
                            ["sky", "sky", "refract", "refractFBO", true, this.waterTextureSize],
                            ["sky", "sky", "reflect", "reflectFBO", true, this.waterTextureSize],
                            ["terrain", "terrainGrid", "refract", "refractFBO", false, this.waterTextureSize],
                            ["terrain", "terrainGrid", "reflect", "reflectFBO", false, this.waterTextureSize],
                            ["sky", "sky", "refract", null, true, null],
                            ["terrain", "terrainGrid", "refract", null, false, null],
                            ["water", "water", "refract", null, false, null],
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