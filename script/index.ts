import Engine from "./adr/Engine";
import Server from "./server";

const server = new Server();
server.init();
server.onMessage((data, reply) => {
    console.log("onMessage: ", data);
    if (!data) {
        return;
    }
    switch (data.type) {
        case "Game":
            reply([{ type: "GameInit" }, { type: "ToggleUI" }, { type: "CreateMessageUI" }]);
            engine.room.lightFire();
            break;
        case "Ping":
            reply([{ type: "Pong", args: [1, 2, 3] }])
            break;
        default:
            break;

    }
});
const engine = new Engine();
engine.init();
