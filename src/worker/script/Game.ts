import SurvivalEngine from "./SurvivalEngine.js";
import { WorkerRequest, WorkerResponse } from "./WorkerMessageType.js";
export default class Game {
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
                    reply([{ type: "GameInit" }, { type: "ToggleUI" }, { type: "CreateMessageUI" }, {type: "AddMessage", args: ["Hello World!!"]}]);
                    break;
                case "Ping":
                    reply([{ type: "Pong", args: [1, 2, 3] }]);
                    break;
                default:
                    break;
            }
        }
    }
    start() {
        console.log("game start");
        const survivalEngine = new SurvivalEngine("Player");
        survivalEngine.play();
    }
}
