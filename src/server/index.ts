import Game from "../worker/Game.js";
import { WorkerResponse } from "../worker/WorkerMessageType.js";
import Server from "./server.js";
//@ts-ignore
import { watch } from "fs";
const server = new Server();
server.init();
const game = new Game();

server.onMessage((data, reply) => {
    if (data === null) {
        return;
    }
    game.onMessage(data, reply);
    handler = reply;
});

let handler = (data: WorkerResponse[]) => { };
watch("./dist", { recursive: true }, () => {
    handler([{ type: "Refresh" }]);
});
watch("./resources", { recursive: true }, () => {
    handler([{ type: "Refresh" }]);
});
watch("./index.html", () => {
    handler([{ type: "Refresh" }]);
});