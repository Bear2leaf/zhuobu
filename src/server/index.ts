//@ts-nocheck
import Manager from "./Manager.js";
import { watch } from "fs";
import Server from "./Server.js";
const server = new Server();
server.init();
const manager = new Manager();


server.on("data", (data, reply) => {
    if (data === null) {
        return;
    }
    manager.onMessage(data, reply, (resp) => server.emit("broadcast", resp));
});

watch("./dist", { recursive: true }, () => {
    server.emit("broadcast", [{ type: "Refresh" }]);
});
watch("./resources", { recursive: true }, () => {
    server.emit("broadcast", [{ type: "Refresh" }]);
});

