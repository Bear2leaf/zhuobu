import { foo } from "./Foo.js";
import { WorkerRequest, WorkerResponse } from "./WorkerMessageType.js";
export default class Game {
    onMessage(data: WorkerRequest[], reply: (data: WorkerResponse[]) => void) {
        console.log("onMessage: ", data);
        if (!data || data.length === 0) {
            foo();
            return;
        }
        while (data.length) {
            const message = data.shift();
            if (!message) {
                throw new Error("message is undefined");
            }
            switch (message.type) {
                case "GameInit":
                    reply([{ type: "WorkerInit" }, { type: "EngineInit" }, { type: "ToggleUI" }, { type: "CreateMessageUI" }]);
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
    }
}
