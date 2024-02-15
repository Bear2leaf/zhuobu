import { WorkerRequest, WorkerResponse } from "../types/index.js";
import Worker from "./Worker.js";

export default class MiniGameWorker extends Worker {
    constructor(private readonly worker: WechatMinigame.Worker) {
        super();
        // worker.onMessage((data) => {
        //     this.game.onMessage([data], this.postMessage.bind(this));
        // });
    }
    postMessage(data: WorkerResponse[]): void {
        this.worker.postMessage(data);
    }
}