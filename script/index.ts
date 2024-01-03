import Server from "./server";

// Query.init();

const server = new Server();
server.init();
server.on('data',(data, reply) => {
    console.log("onData: ", data);
    setTimeout(() => {
        reply({pong: "Got it!"})
    }, 1000);
}, );
console.log("inited...")
