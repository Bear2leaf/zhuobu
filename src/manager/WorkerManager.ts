import { WorkerRequest, WorkerResponse } from "../type/index.js";

export type postMessageCallback = (data: WorkerRequest) => void;

class MessageProcessor {
    private callback: Function = () => { throw new Error("callback is not set") };
    setCallback(callback: Function) {
        this.callback = callback;
    }
    onMessage(data: WorkerResponse): void {
        // console.debug("Pong", data.args);
        switch (data.type) {
            case "Pong":
                this.onPong(data);
                break;
            case "WorkerInit":
                this.onWorkerInit(data);
                break;
            case "Refresh":
                this.onRefresh();
                break;
        }
    }
    onPong(data: WorkerResponse): void {
    }
    onWorkerInit(data: WorkerResponse): void {
        this.callback({ type: "Ping", args: ["Hello"] });
    }
    onRefresh() {
        window.location.reload();
    }
}

export default class WorkerManager {
    private readonly messageProcessor: MessageProcessor = new MessageProcessor();
    workerHandler(postMessage: postMessageCallback, data: WorkerResponse) {
        this.messageProcessor.setCallback(postMessage);
        this.messageProcessor.onMessage(data);
    }
}