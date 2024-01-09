import Engine from "./adr/Engine";
import Server from "./server";
const server = new Server();
server.init();
server.onMessage((data, reply) => {
    console.log("onMessage: ", data);
    if (!data || data.length === 0) {
        return;
    }
    while (data.length) {
        const message = data.shift();
        if (!message) {
            throw new Error("message is undefined");
        }
        switch (message.type) {
            case "GameInit":
                // reply([{ type: "WorkerInit" }, { type: "ToggleUI" }, { type: "CreateMessageUI" }]);
                engine.room.lightFire();
                break;
            case "Ping":
                reply([{ type: "Pong", args: [1, 2, 3] }]);
                break;
            default:
                break;
        }
    }
});
const engine = new Engine();
engine.init();
