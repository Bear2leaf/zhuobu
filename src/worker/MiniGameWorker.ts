import WorkerDevice from "./WorkerDevice";

declare const worker: WechatMinigame.Worker;
export default class MiniGameWorker implements WorkerDevice {
    constructor() {
        worker.onMessage((result: any) => this.onmessage(result));
    }
    onmessage(data: WorkerRequest): void {
        console.log(data)
    }
    emit(data: WorkerResponse): void {
        worker.postMessage(data)
    }
}