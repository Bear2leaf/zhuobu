import Server from "./server";

const server = new Server();
server.init();
server.onMessage((data, reply) => {
    console.log("onMessage: ", data);
    switch (data.type) {
        case "Join":
            setTimeout(() => {
                reply({ type: "WorkerInit" })
            }, 1000);
        case "Ping":
        default:
    }
});
console.log("inited.")
