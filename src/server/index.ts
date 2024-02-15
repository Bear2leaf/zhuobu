import Game from "./Game.js";
import { watch } from "fs";
import Server from "./Server.js";
import { WorkerResponse } from "../types/index.js";
const server = new Server();
server.init();
const game = new Game();

let handler = (data: WorkerResponse[]) => { };

server.on("data", (data, callback) => { data && (handler = callback); });

watch("./dist", { recursive: true }, () => {
    handler([{ type: "Refresh" }]);
});
watch("./resources", { recursive: true }, () => {
    handler([{ type: "Refresh" }]);
});

