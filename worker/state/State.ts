import WorkerDevice from "../device/WorkerDevice.js";
import Icon from "../object/Icon.js";
import Plant from "../object/Plant.js";
import Sky from "../object/Sky.js";
import Terrain from "../object/Terrain.js";
import TerrainGrid from "../object/TerrainGrid.js";
import Water from "../object/Water.js";
import main from "../third/goap/main.js";
export default class State {
    private readonly terrainTextureSize = 2048;
    private readonly waterTextureSize = 256;
    private readonly state: StateData = {
        objects: [
            "terrainFBO",
            "terrain",
            "plant",
            "icon",
            "sky",
            "water"
        ],
        programs: [
            "terrainGrid",
            "terrainFBO",
            "plant",
            "icon",
            "sky",
            "water"
        ],
        varyings: [
            ["icon", "v_scale"]
        ],
        textures: [
            ["diffuse", 0, "terrainGrid", this.terrainTextureSize],
            ["depth", 1, "terrainGrid", this.terrainTextureSize],
            ["refract", 0, "water", this.waterTextureSize],
            ["reflect", 1, "water", this.waterTextureSize],
            ["waterDepth", 2, "water", this.waterTextureSize],
            ["iconSpritesheet", 0, "icon", null, true]
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
        main();
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
                const plantFactory = Plant.create(factory.map);
                const iconFactory = Icon.create(factory.map);
                this.send({
                    type: "SendState",
                    broadcast: true,
                    args: [{
                        modelTranslation: [0, 0, 0],
                        cameras: this.state.cameras,
                        updateCalls: [
                            ["rotateY", ["terrain", "terrainGrid"], "plant", "icon", "water", "sky"],
                            ["updateModel", ["terrain", "terrainGrid"], "plant", "icon", "water", "sky"],
                            ["updateTime"]
                        ],
                        attributes: {
                            "terrainFBO": factory.getAttributes(),
                            "terrainGrid": gridFactory.getAttributes(),
                            "plant": plantFactory.getAttributes(),
                            "icon": iconFactory.getAttributes(),
                            "icon.feedback": iconFactory.getFeedbackAttributes(),
                            "sky": skyFactory.getAttributes(),
                            "water": waterFactory.getAttributes()
                        },
                        uniforms: {
                            "terrainGrid": gridFactory.getUniforms(),
                            "plant": plantFactory.getUniforms(),
                            "icon": iconFactory.getUniforms(),
                            "sky": skyFactory.getUniforms(),
                            "water": waterFactory.getUniforms(),
                        },
                        instanceCounts: {
                            "plant": plantFactory.getInstanceCount(),
                        },
                        renderCalls: [
                            ["terrainFBO", "terrainFBO", "terrainFBO", "terrainFBO", true, this.terrainTextureSize],
                            ["sky", "sky", "refract", "refractFBO", true, this.waterTextureSize],
                            ["sky", "sky", "reflect", "reflectFBO", true, this.waterTextureSize],
                            ["terrain", "terrainGrid", "refract", "refractFBO", false, this.waterTextureSize],
                            ["terrain", "terrainGrid", "reflect", "reflectFBO", false, this.waterTextureSize],
                            ["sky", "sky", "refract", null, true, null],
                            ["terrain", "terrainGrid", "refract", null, false, null],
                            ["plant", "plant", "refract", null, false, null],
                            ["icon", "icon", "refract", null, false, null],
                            ["water", "water", "refract", null, false, null],
                        ],
                        animation: true
                    }]
                })
                setInterval(() => {

                    this.send({
                        type: "SendState",
                        broadcast: true,
                        args: [{
                            changeAttributes: {
                                "icon": iconFactory.getRandomAttributes(),
                            }
                        }]
                    })
                    this.state.changeAttributes = undefined;
                }, 1000)
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