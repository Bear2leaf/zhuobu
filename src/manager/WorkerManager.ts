import { LibNHCallback } from "../libnhcallback/LibNHCallback.js";
import shim_init_nhwindows from "../libnhcallback/shim_init_nhwindows.js";
import Manager from "./Manager.js";


export default class WorkerManager extends Manager<LibNHCallback> {
    addObjects(): void {
        [
            shim_init_nhwindows
        ].forEach((ctor) => {
            this.add(ctor);
        });
    }
    async load(): Promise<void> {
    }
    init(): void {
        this.getDevice().createWorker("workers/nethack.js", (worker: Worker, name: string, ...args: unknown[]) => {
            this.get(this.callbackNameToCtor(name)).decode(...args);
            this.get(this.callbackNameToCtor(name)).execute();
        });
    }
    update(): void {
    }
    private callbackNameToCtor(name: string): new () => LibNHCallback {
        switch (name) {
            case "shim_init_nhwindows":
                return shim_init_nhwindows;
            default:
                throw new Error(`callback ${name} not found`);
        }
    }
}