import Game from "./Game.js";
import { watch } from "fs";
import Server from "./Server.js";
import { WorkerResponse } from "../types/index.js";
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