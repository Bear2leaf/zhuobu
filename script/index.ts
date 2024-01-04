import Engine from "./adr/Engine";
import Server from "./server";

const server = new Server();
server.init();
let interval = 0;
server.onMessage((data, reply) => {
    console.log("onMessage: ", data);
    if (!data) {
        clearInterval(interval)
        return;
    }
    switch (data.type) {
        case "Game":
            reply({ type: "GameInit" });
            interval = setInterval(() => {
                reply({ type: "ToggleUI" })
            }, 5000);
            break;
        case "Ping":
            reply({ type: "Pong", args: [1, 2, 3] })
            break;
        default:
            break;

    }
});
const engine = new Engine();
engine.init();
setTimeout(() => {
    engine.room.lightFire();
}, 1000);
console.log("inited.")
