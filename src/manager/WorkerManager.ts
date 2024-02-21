import Device from "../device/Device.js";

export default class WorkerManager {
    private readonly requestQueue: WorkerRequest[] = [];
    private readonly responseQueue: WorkerResponse[] = [];
    private readonly batchMap: Map<string, { name: string, value: number[] }[]> = new Map();
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
                        foo: "bar"
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
            case "SendModelTranslation":
                this.updateModelTranslation!(data.args[0]);
                break;
            case "SendTerrainUniforms":
                this.buildTerrainUniformsData(data.args);
                break;
            case "SendAttrBatch":
                const batch = data.args.slice(1) as { name: string, value: number[] }[];
                this.batchMap.get(data.args[0])!.push(...batch)
                break;
            case "SendAttrBatchBegin":
                this.batchMap.set(data.args[0], [])
                break;
            case "SendAttrBatchEnd":
                this.buildAttributes(data.args[0]);
                this.batchMap.set(data.args[0], [])
                break;
        }
    }
    buildAttributes(name: string) {
        const data: Record<string, number[]> = {};
        this.batchMap.get(name)!.forEach(attr => {
            data[attr.name] = data[attr.name] || [];
            data[attr.name].push(...attr.value);
        });
        for (const key in data) {
            if (name === "Terrain") {
                this.initTerrainAttr!(key, "FLOAT", 3, data[key]);
            } else if (name === "TerrainFBO") {
                this.initTerrainFBOAttr!(key, "FLOAT", 3, data[key])
            } else {
                throw new Error("unsupport type")
            }
        }
    }
    buildTerrainUniformsData(args: { name: string, value: number[] }[]) {
        const scales: number[] = [];
        const offsets: number[] = [];
        const edges: number[] = [];
        args.forEach(attr => {
            if (attr.name === "u_scales") {
                scales.push(...attr.value);
            } else if (attr.name === "u_offsets") {
                offsets.push(...attr.value);
            } else if (attr.name === "u_edges") {
                edges.push(...attr.value);
            } else {
                throw new Error("Not supported name.");
            }

        })
        this.updateTerrainUniforms!(edges, scales, offsets);
    }
    requestTerrain() {
        this.requestQueue.push({
            type: "RequestTerrain"
        });
    }
    updateTerrainUniforms?: (edges: number[], scales: number[], offsets: number[]) => void;
    updateModelTranslation?: (translation: [number, number, number]) => void;
    initTerrainFBOAttr?: (name: string, type: "FLOAT", size: number, attribute: number[]) => void;
    initTerrainAttr?: (name: string, type: "FLOAT", size: number, attribute: number[]) => void;
}