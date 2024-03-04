import Device from "../device/Device.js";
export function scriptModule() {
    return import("../../resource/game.js")
}
export default class Worker {
    private readonly requestQueue: WorkerRequest[] = [];
    private readonly responseQueue: WorkerResponse[] = [];
    private sendMessage?: (data: WorkerRequest) => void;
    private reload?: () => void;
    callScript?: Awaited<ReturnType<typeof scriptModule>>["workerCalls"];
    init(device: Device) {
        this.reload = device.reload;
        device.createWorker("dist/worker/index.js", (data, sendMessage) => {
            this.responseQueue.push(data);
            this.sendMessage = sendMessage;
        })
    }
    process() {
        if (this.responseQueue.length) {
            this.decodeMessage(this.responseQueue.shift()!);
        } else if (this.sendMessage && this.requestQueue.length) {
            this.sendMessage(this.requestQueue.shift()!)
        }
    }
    decodeMessage(data: WorkerResponse) {
        switch (data.type) {
            case "Refresh":
                this.reload!();
                break;
            case "SendState":
                this.decodeState(data.args[0]);
                break;
        }
    }
    decodeState(state: StateData) {
        if (state.objects && state.programs && state.textures && state.framebuffers && state.textureFBOBindings && state.cameras) {
            this.createObjects!(state.programs, state.objects, state.textures, state.framebuffers, state.cameras, state.textureFBOBindings);
            return;
        }
        if (!this.callScript) {
            throw new Error("call script not set.")
        }
        state.modelTranslation && this.callScript.updateModelTranslation && this.callScript.updateModelTranslation(state.modelTranslation);
        state.animation !== undefined && this.callScript.updateModelAnimation && this.callScript.updateModelAnimation(state.animation);
        if (state.attributes) {
            for (const key in state.attributes) {
                if (Object.prototype.hasOwnProperty.call(state.attributes, key)) {
                    const element = state.attributes[key];
                    for (const attribute of element) {
                        if (attribute.type === undefined && attribute.size == undefined && attribute.name === "indices") {
                            this.callScript.initIndices(key, key, attribute.name, attribute.value)
                        } else if (attribute.type !== undefined && attribute.size !== undefined) {
                            this.callScript.initAttributes(key, key, attribute.name, attribute.type, attribute.size, attribute.value, attribute.divisor)
                        } else {
                            throw new Error("unsupport attribute type.")
                        }
                    };
                }
            }
        }
        if (state.uniforms) {
            for (const key in state.uniforms) {
                if (Object.prototype.hasOwnProperty.call(state.uniforms, key)) {
                    for (const uniform of state.uniforms[key]) {
                        this.callScript.updateUniforms(key, uniform.name, uniform.type, uniform.value);
                    }
                }
            }
        }
        if (state.renderCalls) {
            this.callScript.updateRenderCalls(state.renderCalls);
        }
        if (state.instanceCounts) {
            for (const key in state.instanceCounts) {
                if (Object.prototype.hasOwnProperty.call(state.instanceCounts, key)) {
                    this.callScript.updateInstanceCount(key, state.instanceCounts[key]);

                }
            }
        }
        if (state.updateCalls) {
            this.callScript.updateUpdateCalls(state.updateCalls)
        }
    }
    engineLoaded() {
        this.requestQueue.push({
            type: "EngineLoaded"
        });
    }
    createObjects?: (programs: string[], objects: string[], textures: [string, number, string][], framebuffers: string[], cameras: Camera[], textureFBOBindings:string[][]) => void;
}