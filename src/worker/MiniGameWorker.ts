import Game from "./Game.js";
import { WorkerRequest, WorkerResponse } from "./WorkerMessageType.js";
import Worker from "./Worker.js";

export type MiniGameWorkerType = { onMessage: (callback: (data: WorkerRequest) => void) => void, postMessage: (data: WorkerResponse[]) => void }

export default class MiniGameWorker extends Worker {
    private readonly game = new Game();
    constructor(private readonly worker: MiniGameWorkerType) {
        super();
        worker.onMessage((data) => {
            this.game.onMessage([data], this.postMessage.bind(this));
        });
    }
    postMessage(data: WorkerResponse[]): void {
        this.worker.postMessage(data);
    }
}