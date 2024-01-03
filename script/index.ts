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
            reply({ type: "GameInit" });
            setInterval(() => {
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
console.log("inited.")
