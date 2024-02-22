import { STATUS_CODES, createServer } from 'http';
import { readFile, watch } from "fs";
import { WebSocketServer, WebSocket } from 'ws';
import { extname } from "path";

const OPCODES = {
    text: 0x01,
    close: 0x08
}

export default class Server {
    PORT = 4000;
    GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
    server = createServer((request, response) => {
        const url = request.url;
        if (!url) {
            throw new Error("url is undefined");
        }
        const filePath = '.' + url;
        const ext = extname(filePath);
        let contentType = 'text/html';
        switch (ext) {
            case '.sk':
            case '.gltf':
                contentType = 'text/plain';
                break;
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
                contentType = 'image/jpg';
                break;
            case '.wav':
                contentType = 'audio/wav';
                break;
            case '.bin':
                contentType = 'application/octet-stream';
                break;
        }
        if (url.startsWith("/ws")) {
            const UPGRADE_REQUIRED = 426;
            const body = STATUS_CODES[UPGRADE_REQUIRED];
            response.writeHead(UPGRADE_REQUIRED, {
                'Content-Type': 'text/plain',
                'Upgrade': 'WebSocket',
            });
            response.end(body);
        }
        else if (url === "/") {
            this.createWebcomponentPage("/c/main-game", response);
        }
        else if (url.startsWith("/c")) {
            this.createWebcomponentPage(url, response);
        }
        else if (url.startsWith("/dist") || url.startsWith("/resources") || url.startsWith("/third") || url.startsWith("/dist-worker")) {
            readFile(filePath, function (error, content) {
                if (error) {
                    if (error.code == 'ENOENT') {
                        response.writeHead(404);
                        response.end();
                    }
                    else {
                        response.writeHead(500);
                        response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                        response.end();
                    }
                }
                else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
        }
        else {
            response.writeHead(404);
            response.end();
        }
    });
    createWebcomponentPage(url, response) {
        const component = url.split("/c/")[1].toLowerCase();
        const componentClassName = component.split("-").map(word => {
            const sneakCase = [...word];
            sneakCase[0] = word[0].toUpperCase();
            return sneakCase.join("");
        }).join("")
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(`
        <script type="module">
            import ${componentClassName} from "/dist/webcomponent/${componentClassName}.js";
            customElements.define("${component}", ${componentClassName});
        </script>
        <${component}></${component}>
        `, 'utf-8');
    }
    broadcast(msg, isBinary) {
        const wss = this.wss;
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(msg, { binary: isBinary });
            }
        });
    }
    init() {
        watch("./dist", { recursive: true }, () => {
            this.broadcast(JSON.stringify({ type: "Refresh" }));
        });
        watch("./dist-worker", { recursive: true }, () => {
            this.broadcast(JSON.stringify({ type: "Refresh" }));
        });
        watch("./resources", { recursive: true }, () => {
            this.broadcast(JSON.stringify({ type: "Refresh" }));
        });
        const wss = this.wss = new WebSocketServer({ noServer: true });
        wss.on("connection", (ws) => {
            ws.on("error", console.error);
            ws.on('message', (msg, isBinary) => {
                const data = JSON.parse(msg);
                if (data.broadcast) {
                    this.broadcast(msg, isBinary)
                }
            });

        })
        this.server.on('upgrade', function upgrade(request, socket, head) {
            if (request.url === '/ws') {
                wss.handleUpgrade(request, socket, head, function done(ws) {
                    wss.emit('connection', ws, request);
                });
            } else {
                socket.destroy();
            }
        });
        this.server.listen(this.PORT);
    }
}

const server = new Server();

server.init();