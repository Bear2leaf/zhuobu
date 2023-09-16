import { WorkerRequest, WorkerResponse, WorkerResponseType } from "../worker/MessageProcessor.js";
import Manager from "./Manager.js";

export type postMessageCallback = (data: WorkerRequest) => void;

class MessageProcessor {
    private callback: Function = () => { throw new Error("callback is not set") };
    setCallback(callback: Function) {
        this.callback = callback;
    }
    onMessage(data: WorkerResponse): void {
        console.debug("Pong", data.args);
        switch (data.type) {
            case "Pong":
                this.onPong(data);
                break;
            case "WorkerInit":
                this.onWorkerInit(data);
                break;
        }
    }
    onPong(data: WorkerResponse): void {
    }
    onWorkerInit(data: WorkerResponse): void {
        this.callback({ type: "Ping", args: ["Hello"] });
    }
}

export default class WorkerManager extends Manager<MessageProcessor> {
    addObjects(): void {
        [
            MessageProcessor
        ].forEach((ctor) => {
            this.add(ctor);
        });
    }
    async load(): Promise<void> {
    }

    init(): void {
        this.getDevice().createWorker("worker/main.js", (postMessage: postMessageCallback, data: WorkerResponse) => {
            this.all().forEach(processor => {
                processor.setCallback(postMessage);
                processor.onMessage(data);
            });
        });
    }
    update(): void {
    }
}