import SurvivalEngine from "./SurvivalEngine.js";
export default class Manager {
    private engine?: SurvivalEngine;
    private state: Record<string, string> = {}
    private initEngine() {
        this.engine = new SurvivalEngine("Player");
    }
    getEngine(): SurvivalEngine {
        if (!this.engine) {
            throw new Error("engine is undefined");
        }
        return this.engine;
    }
    onMessage(data: WorkerRequest[], reply: (data: WorkerResponse[]) => void) {
        console.log("[WorkerReceive]", data);
        if (!data || data.length === 0) {
            return;
        }
        while (data.length) {
            const message = data.shift();
            if (!message) {
                throw new Error("message is undefined");
            }
            switch (message.type) {
                case "EngineInit":
                    this.initEngine();
                    // reply([{ type: "GameInit" }]);
                    reply([{ type: "GameInit" }, { type: "ToggleUI" }, { type: "CreateMessageUI" }, { type: "AddMessage", args: ["Hello World!!"] }]);

                    this.getEngine().addMessage = (message: string) => {
                        reply([{ type: "AddMessage", args: [message] }]);
                    }
                    this.getEngine().updateStatus = (message: string) => {
                        reply([{ type: "UpdateStatus", args: [message] }]);
                    }
                    this.getEngine().updateEagleVisible = (visible: boolean) => {
                        reply([{ type: "UpdateEagleVisible", args: [visible] }]);
                    }
                    this.getEngine().updateWhalesVisible = (visible: boolean) => {
                        reply([{ type: "UpdateWhalesVisible", args: [visible] }]);
                    }
                    this.getEngine().updateResourceProgres = (progress: number) => {
                        reply([{ type: "UpdateResourceProgress", args: [progress] }]);
                    }
                    this.getEngine().start();
                    break;
                case "Ping":
                    reply([{ type: "Pong", args: [1, 2, 3] }]);
                    break;
                case "Explore":
                    this.getEngine().survival('1');
                    break;
                case "Rest":
                    this.getEngine().survival('2');
                    break;
                case "UpdateCameraFov":
                    this.state["CameraFov"] = `${message.args[0]}`
                    break;
                case "GetCameraFov":
                    reply([{ type: "SendCameraFov", args: [this.state["CameraFov"]] }])
                    break;
                case "HelloCompInit":
                    reply([{ type: "HelloCompInitWorker" }])
                    break;
                default: 
                    break;
            }
        }
    }
}
