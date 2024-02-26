import Device from "../device/Device.js";

export default class Worker {
    private readonly requestQueue: WorkerRequest[] = [];
    private readonly responseQueue: WorkerResponse[] = [];
    private sendMessage?: (data: WorkerRequest) => void;
    private reload?: () => void;
    init(device: Device) {
        this.reload = device.reload;
        device.createWorker("dist-worker/index.js", (data, sendMessage) => {
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
        }
    }
    decodeState(state: StateData) {
        this.updateModelTranslation!(state.modelTranslation!);
    }
    buildAttributes(name: string, ...batch: { name: string, value: number[] }[]) {
        batch.forEach(attribute => {
            if (name === "Terrain") {
                this.initTerrainAttr!(attribute.name, "FLOAT", 3, attribute.value);
            } else if (name === "TerrainFBO") {
                this.initTerrainFBOAttr!(attribute.name, "FLOAT", 3, attribute.value)
            } else {
                throw new Error("unsupport type.")
            }
        });
    }
    buildUniformsData(name: string, ...batch: { name: string, value: number[] }[]) {
        if (name === "Terrain") {

            const scales: number[] = [];
            const offsets: number[] = [];
            const edges: number[] = [];
            batch.forEach(uniform => {
                if (uniform.name === "u_scales") {
                    scales.push(...uniform.value);
                } else if (uniform.name === "u_offsets") {
                    offsets.push(...uniform.value);
                } else if (uniform.name === "u_edges") {
                    edges.push(...uniform.value);
                } else {
                    throw new Error("Not supported name.");
                }

            })
            this.updateTerrainUniforms!(edges, scales, offsets);
        } else {
            throw new Error("unsupport type.")
        }
    }
    requestTerrain() {
        this.requestQueue.push({
            type: "RequestTerrain"
        });
    }
    updateTerrainUniforms?: (edges: number[], scales: number[], offsets: number[]) => void;
    updateModelTranslation?: (translation: number[]) => void;
    initTerrainFBOAttr?: (name: string, type: "FLOAT", size: number, attribute: number[]) => void;
    initTerrainAttr?: (name: string, type: "FLOAT", size: number, attribute: number[]) => void;
}