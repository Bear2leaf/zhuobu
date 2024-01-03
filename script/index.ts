import Server from "./server";

const server = new Server();
server.init();
server.onMessage((data, reply) => {
    console.log("onMessage: ", data);
    if (!data) {
        return;
    }
    switch (data.type) {
        case "Join":
            reply({ type: "WorkerInit" })
        case "Ping":
        default:
    }
});
console.log("inited.")
