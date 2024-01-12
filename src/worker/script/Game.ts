import SurvivalEngine from "./SurvivalEngine.js";
import { WorkerRequest, WorkerResponse } from "./WorkerMessageType.js";
export default class Game {
    private engine?: SurvivalEngine;
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
                    reply([{ type: "GameInit" }, { type: "ToggleUI" }, { type: "CreateMessageUI" }, {type: "AddMessage", args: ["Hello World!!"]}]);

                    this.getEngine().log = (message: string) => {
                        reply([{ type: "AddMessage", args: [message] }]);
                    }
                    this.getEngine().start();
                    break;
                case "Ping":
                    reply([{ type: "Pong", args: [1, 2, 3] }]);
                    break;
                default:
                    break;
            }
        }
    }
}
