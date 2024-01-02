import Server from "./server";
import Query from "./query";

Query.init();

const server = new Server();
server.init();
console.log("inited")
