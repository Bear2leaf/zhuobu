import WorkerDevice from "../device/WorkerDevice.js";
import Island from "../island/Island.js";
import Icon from "../object/Icon.js";
import Plant from "../object/Plant.js";
import Sky from "../object/Sky.js";
import Terrain from "../object/Terrain.js";
import TerrainGrid from "../object/TerrainGrid.js";
import Water from "../object/Water.js";
export default class State {
    private readonly terrainTextureSize = 2048;
    private readonly waterTextureSize = 256;
    private interval = 0;
    private readonly state: StateData = {
        objects: [
            "terrainFBO",
            "terrain",
            "plant",
            "plant.feedback",
            "icon",
            "icon.feedback",
            "sky",
            "water"
        ],
        programs: [
            "terrainGrid",
            "terrainFBO",
            "plant",
            "plant.feedback",
            "icon",
            "icon.feedback",
            "sky",
            "water"
        ],
        varyings: [
            // varings index should be THE SAME with attribute layout in vertex transform shader.
            // eg. v_scale:0, v_position:1 ---> layout(location = 0) in xxx a_scale; layout(location = 1) in xxx a_position;
            ["icon.feedback", "icon.feedback", "v_scale", "v_position"],
            ["plant.feedback", "plant.feedback", "v_translation"],
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
                eye: [0, 1.5, 1.5],
                target: [0, 0, 0],
                up: [0, 1, 0],
                fieldOfViewYInRadians: Math.PI / 4,
                zNear: 0.1,
                zFar: 10,
            }, {
                name: "reflect",
                eye: [0, -1.5, 1.5],
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
                const island = new Island();
                island.generateBorderPoints();
                const factory = Terrain.create(island);
                const gridFactory = TerrainGrid.create();
                const skyFactory = Sky.create();
                const waterFactory = Water.create();
                const plantFactory = Plant.create(island);
                const iconFactory = Icon.create(island);
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
                            "plant.feedback": plantFactory.getFeedbackAttributes(),
                            "plant": plantFactory.getAttributes(),
                            "icon.feedback": iconFactory.getFeedbackAttributes(),
                            "icon": iconFactory.getAttributes(),
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
                            "plant.feedback": plantFactory.getInstanceCount(),
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
                            ["plant.feedback", "plant.feedback", "refract", null, false, null],
                            ["plant", "plant", "refract", null, false, null],
                            ["water", "water", "refract", null, false, null],
                            ["icon.feedback", "icon.feedback", "refract", null, false, null],
                            ["icon", "icon", "refract", null, false, null],
                        ],
                        animation: true
                    }]
                })
                clearInterval(this.interval);
                this.interval = setInterval(() => {
                    island.updatePlans();
                    this.send({
                        type: "SendState",
                        broadcast: true,
                        args: [{
                            changeAttributes: {
                                "icon.feedback": iconFactory.getUpdatedAttributes(island),
                                "plant.feedback": plantFactory.getUpdatedAttributes(island),
                            }
                        }]
                    })
                    this.state.changeAttributes = undefined;
                }, 1000);
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