import { STATUS_CODES, createServer } from 'http';
import { EventEmitter } from "node:events";
import { createHash } from "crypto";
import { readFile, watch } from "fs";
import path from "path";
const OPCODES = {
    text: 0x01,
    close: 0x08
}

export default class Server extends EventEmitter {
    PORT = 4000;
    GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
    server = createServer((request, response) => {
        const url = request.url;
        if (!url) {
            throw new Error("url is undefined");
        }
        const filePath = '.' + url;
        const extname = path.extname(filePath);
        let contentType = 'text/html';
        switch (extname) {
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
        else if (url.startsWith("/dist") || url.startsWith("/resources") || url.startsWith("/third") || url.startsWith("/worker")) {
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
    generateAcceptValue(acceptKey) {
        return createHash('sha1')
            .update(acceptKey + this.GUID, 'binary')
            .digest('base64');
    }

    createFrame(data) {
        const payload = JSON.stringify(data);


        const payloadByteLength = Buffer.byteLength(payload);
        let payloadBytesOffset = 2;
        let payloadLength = payloadByteLength;

        if (payloadByteLength > 65535) { // length value cannot fit in 2 bytes
            payloadBytesOffset += 8;
            payloadLength = 127;
        } else if (payloadByteLength > 125) {
            payloadBytesOffset += 2;
            payloadLength = 126;
        }


        const buffer = Buffer.alloc(payloadBytesOffset + payloadByteLength);

        // first byte
        buffer.writeUInt8(0b10000001, 0); // [FIN (1), RSV1 (0), RSV2 (0), RSV3 (0), Opсode (0x01 - text frame)]

        buffer[1] = payloadLength; // second byte - actual payload size (if <= 125 bytes) or 126, or 127

        if (payloadLength === 126) { // write actual payload length as a 16-bit unsigned integer
            buffer.writeUInt16BE(payloadByteLength, 2);
        } else if (payloadByteLength === 127) { // write actual payload length as a 64-bit unsigned integer

            buffer.writeBigUInt64BE(BigInt(payloadByteLength), 2);
        }

        buffer.write(payload, payloadBytesOffset);
        return buffer;
    }

    parseFrame(buffer) {
        const firstByte = buffer.readUInt8(0);
        const opCode = firstByte & 0b00001111; // get last 4 bits of a byte

        if (opCode === OPCODES.close) {
            this.emit('close');
            return null;
        } else if (opCode !== OPCODES.text) {
            throw new Error("Wrong opCode" + opCode)
        } else {

            // second byte processing next...
            // ... first byte processing ...

            const secondByte = buffer.readUInt8(1);

            let offset = 2;
            let payloadLength = secondByte & 0b01111111; // get last 7 bits of a second byte

            if (payloadLength === 126) {
                offset += 2;
            } else if (payloadLength === 127) {
                offset += 8;
            }
            // ... first and second byte processing ...

            const isMasked = Boolean((secondByte >>> 7) & 0b00000001); // get first bit of a second byte

            if (isMasked) {
                const maskingKey = buffer.readUInt32BE(offset); // read 4-byte (32-bit) masking key
                offset += 4;
                const payload = buffer.subarray(offset);
                const result = this.unmask(payload, maskingKey);
                return result.toString('utf-8');
            }

            return buffer.subarray(offset).toString('utf-8');
        }

    }

    unmask(payload, maskingKey) {

        const result = Buffer.alloc(payload.byteLength);

        for (let i = 0; i < payload.byteLength; ++i) {
            const j = i % 4;
            const maskingKeyByteShift = j === 3 ? 0 : (3 - j) << 3;
            const maskingKeyByte = (maskingKeyByteShift === 0 ? maskingKey : maskingKey >>> maskingKeyByteShift) & 0b11111111;
            const transformedByte = maskingKeyByte ^ payload.readUInt8(i);
            result.writeUInt8(transformedByte, i);
        }

        return result;
    }
    init() {
        const clients = [];
        this.server.on('upgrade', (req, socket) => {
            if (req.headers.upgrade !== 'websocket') {
                socket.end('HTTP/1.1 400 Bad Request');
                return;
            }

            const acceptKey = req.headers['sec-websocket-key'];
            if (!acceptKey) {
                throw new Error('acceptKey not found');
            }
            const acceptValue = this.generateAcceptValue(acceptKey);

            const responseHeaders = [
                'HTTP/1.1 101 Switching Protocols',
                'Upgrade: websocket',
                'Connection: Upgrade',
                `Sec-WebSocket-Accept: ${acceptValue}`,
            ];
            clients.push(socket);
            socket.on('close', () => {
                const index = clients.indexOf(socket);
                if (index !== -1) {
                    clients.splice(index, 1);
                }
            });
            socket.on('error', () => {
                const index = clients.indexOf(socket);
                if (index !== -1) {
                    clients.splice(index, 1);
                }
                if (clients.length > 10) {
                    console.warn("too many clients, CHECK!")
                }
            })
            socket.on('data', (buffer) => {
                this.emit('data', JSON.parse(this.parseFrame(buffer)), (data) => socket.write(this.createFrame(data)))
            });
            socket.write(responseHeaders.concat('\r\n').join('\r\n'));
        });
        this.on("broadcast", (data) => {
            for (const client of clients) {
                client.write(this.createFrame(data));
            };
        })
        this.server.listen(this.PORT);
    }
}

const server = new Server();

server.init();
server.on("data", (data) => {
    if (data === null) {
        return;
    }
    if (data.broadcast) {
        server.emit("broadcast", data);
    }
});
watch("./dist", { recursive: true }, () => {
    server.emit("broadcast", { type: "Refresh" });
});
watch("./resources", { recursive: true }, () => {
    server.emit("broadcast", { type: "Refresh" });
});
watch("./worker", { recursive: true }, () => {
    server.emit("broadcast", { type: "Refresh" });
});