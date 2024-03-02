import Device from "../device/Device.js";

export default class Worker {
    private readonly requestQueue: WorkerRequest[] = [];
    private readonly responseQueue: WorkerResponse[] = [];
    private sendMessage?: (data: WorkerRequest) => void;
    private reload?: () => void;
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
            case "WorkerInit":
                break;
            case "Refresh":
                this.reload!();
                break;
            case "SendState":
                this.decodeState(data.args[0]);
                break;
        }
    }
    decodeState(state: StateData) {
        state.modelTranslation && this.updateModelTranslation && this.updateModelTranslation(state.modelTranslation);
        state.animation !== undefined && this.updateModelAnimation && this.updateModelAnimation(state.animation);
        if (state.objects && state.programs && state.textures && state.framebuffers) {
            this.createObjects!(state.programs, state.objects, state.textures, state.framebuffers);
        }
        if (state.attributes) {
            for (const key in state.attributes) {
                if (Object.prototype.hasOwnProperty.call(state.attributes, key)) {
                    const element = state.attributes[key];
                    this.buildAttributes(key, ...element);

                }
            }
        }
        if (state.uniforms) {
            for (const key in state.uniforms) {
                if (Object.prototype.hasOwnProperty.call(state.uniforms, key)) {
                    const element = state.uniforms[key];
                    this.buildUniformsData(key, ...element);

                }
            }
        }
        if (state.renderCalls) {
            for (const [program, object, framebuffer, uniforms] of state.renderCalls) {
                this.updateRenderCalls!(program, object, framebuffer, uniforms)
            }
        }
        if (state.cameras) {
            for (const { programName, eye, target, up, fieldOfViewYInRadians, zFar, zNear, aspect } of state.cameras) {
                this.updateCamera!(programName, eye, target, up, fieldOfViewYInRadians, aspect, zNear, zFar);
            }
        }
        if (state.instanceCounts) {
            for (const key in state.instanceCounts) {
                if (Object.prototype.hasOwnProperty.call(state.instanceCounts, key)) {
                    const element = state.instanceCounts[key];
                    this.updateInstanceCount!(key, element);

                }
            }
        }
        if (state.updateCalls) {
            this.updateUpdateCalls!(state.updateCalls)
        }
    }
    buildAttributes(name: string, ...batch: { name: string, value: number[], type: GLType, size: number, divisor?: number }[]) {
        batch.forEach(attribute => {
            this.initAttributes!(name, name, attribute.name, attribute.type, attribute.size, attribute.value, attribute.divisor)
        });
    }
    buildUniformsData(name: string, ...batch: { name: string, value: number[], type: GLUniformType }[]) {
        batch.forEach(uniform => {
            this.updateUniforms!(name, uniform.name, uniform.type, uniform.value);
        })
    }
    requestTerrain() {
        this.requestQueue.push({
            type: "CreateTerrain"
        });
    }
    terrainCreated() {
        this.requestQueue.push({
            type: "TerrainCreated"
        });
    }
    updateUpdateCalls?: (callbackNames: "rotateTerrain"[]) => void;
    updateRenderCalls?: (program: string, object: string, framebuffer: string, uniforms: [string, GLUniformType, number[] | Float32Array][]) => void;
    updateUniforms?: (programName: string, uniformName: string, type: GLUniformType, values: number[]) => void;
    updateInstanceCount?: (objectName: string, count: number) => void;
    updateModelTranslation?: (translation: number[]) => void;
    updateModelAnimation?: (animation: boolean) => void;
    initAttributes?: (objectName: string, programName: string, name: string, type: GLType, size: number, attribute: number[], divisor?: number) => void;
    createObjects?: (programs: string[], objects: string[], textures: string[], framebuffers: string[]) => void;
    updateCamera?: (programName: string, eye: [number, number, number], target: [number, number, number], up: [number, number, number], fieldOfViewYInRadians: number, aspect: number, zNear: number, zFar: number) => void;


}