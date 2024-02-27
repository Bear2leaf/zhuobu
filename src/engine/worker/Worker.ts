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
                this.requestQueue.push({
                    type: "SyncState",
                    args: [{
                        foo: "bar1"
                    }]
                });
                break;
            case "RequestSync":
                this.requestQueue.push({
                    type: "SyncState"
                });
                break;
            case "Refresh":
                this.reload!();
                break;
            case "SendState":
                this.decodeState(data.args[0]);
                break;
            case "SendUniforms":
                this.buildUniformsData(...data.args);
                break;
            case "SendAttributes":
                this.buildAttributes(...data.args);
                break;
            case "SendInstanceCount":
                this.updateInstanceCount!(...data.args);
                break;
            case "SendCreateObjects":
                this.createObjects!(...data.args);
                break;
            case "SendObjectCreated":
                this.onObjectCreated!();
                break;
        }
    }
    decodeState(state: StateData) {
        state.modelTranslation && this.updateModelTranslation && this.updateModelTranslation(state.modelTranslation);
        state.animation !== undefined && this.updateModelAnimation && this.updateModelAnimation(state.animation);
    }
    buildAttributes(name: string, ...batch: { name: string, value: number[], type: "FLOAT" | "INT", size: number, divisor?: number }[]) {
        batch.forEach(attribute => {
            this.initAttributes!(name, name, attribute.name, attribute.type, attribute.size, attribute.value, attribute.divisor)
        });
    }
    buildUniformsData(name: string, ...batch: { name: string, value: number[], type: '1iv' | '1i' | '1f' | '2fv' | '3fv' | 'Matrix4fv' }[]) {
        batch.forEach(uniform => {
            this.updateUniforms!(name, uniform.name, uniform.type, uniform.value);
        })
    }
    requestTerrain() {
        this.requestQueue.push({
            type: "RequestTerrain"
        });
    }
    requestLoadStart() {
        this.requestQueue.push({
            type: "RequestLoadStart"
        });
    }
    requestObjectCreated() {
        this.requestQueue.push({
            type: "RequestObjectCreated"
        });
    }
    initStates() {
        this.requestQueue.push({
            type: "SyncState",
            args: [{
                animation: true
            }]
        });
        this.requestQueue.push({
            type: "SyncState",
            args: [{
                modelTranslation: [0, 0, 0]
            }]
        })
    }
    updateUniforms?: (programName: string, uniformName: string, type: '1iv' | '1i' | '1f' | '2fv' | '3fv' | 'Matrix4fv', values: number[]) => void;
    updateInstanceCount?: (objectName: string, count: number) => void;
    updateModelTranslation?: (translation: number[]) => void;
    updateModelAnimation?: (animation: boolean) => void;
    initAttributes?: (objectName: string, programName: string, name: string, type: "FLOAT" | "INT", size: number, attribute: number[], divisor?: number) => void;
    createObjects?: (programs: string[], objects: string[], textures: string[]) => void;
    onObjectCreated?: () => void;

}