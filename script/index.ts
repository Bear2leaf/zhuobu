import Server from "./server";

// Query.init();

const server = new Server();
server.on('data', console.log)
server.init();
console.log("inited..")
