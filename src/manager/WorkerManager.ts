export default class WorkerManager {
    private callback?: (data: WorkerRequest) => void;
    get postMessage() {
        if (this.callback === undefined) {
            throw new Error("callback is undefined");
        }
        return this.callback;
    }
    setCallback(callback: typeof this.callback) {
        this.callback = callback;
    }
    messageHandler(data: WorkerResponse): void {
        console.log("messageHandler", data)
        switch (data.type) {
            case "Pong":
                break;
            case "WorkerInit":
                this.postMessage({ type: "Ping", args: ["Hello"] })
                break;
            case "Refresh":
                window.location.reload();
                break;
        }
    }
}