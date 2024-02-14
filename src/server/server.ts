//@ts-ignore
import { STATUS_CODES, createServer } from 'http';
//@ts-ignore
import { EventEmitter } from "node:events";
//@ts-ignore
import { createHash } from "crypto";
//@ts-ignore
import { readFile } from "fs";
//@ts-ignore
import path from "path";
//@ts-ignore
import { WorkerRequest, WorkerResponse } from '../worker/WorkerMessageType.js';
enum OPCODES {
    text = 0x01,
    close = 0x08
}

export default class Server extends EventEmitter {
    private readonly PORT: number = 4000;
    private readonly GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
    private readonly server = createServer((request: Request, response: any) => {
        if (request.url.startsWith("/ws")) {
            const UPGRADE_REQUIRED = 426;
            const body = STATUS_CODES[UPGRADE_REQUIRED];
            response.writeHead(UPGRADE_REQUIRED, {
                'Content-Type': 'text/plain',
                'Upgrade': 'WebSocket',
            });
            response.end(body);
        }
        else if (request.url === "/") {
            this.read("./index.html", "text/html", response);
        }
        else if (request.url.startsWith("/worker")) {
            const filePath = './dist' + request.url;
            const contentType = 'text/javascript';
            this.read(filePath, contentType, response);
        }
        else if (request.url.startsWith("/webcomponent")) {
            const contentType = 'text/html';
            const component = request.url.split("/webcomponent/")[1].toLowerCase();
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(`<script src="/dist/webcomponent/main.js" type="module"></script>\n<${component}></${component}>`, 'utf-8');
        }
        else if (request.url.startsWith("/dist") || request.url.startsWith("/resources") || request.url.startsWith("/worker")) {
            let filePath = '.' + request.url;
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
                case '.css':
                    contentType = 'text/css';
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
            this.read(filePath, contentType, response);
        }
        else {
            response.writeHead(404);
            response.end();
        }
    });
    private read(filePath: string, contentType: string, response: any) {
        readFile(filePath, function (error: any, content: string) {
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
    private generateAcceptValue(acceptKey: string) {
        return createHash('sha1')
            .update(acceptKey + this.GUID, 'binary')
            .digest('base64');
    }
    //@ts-ignore
    private createFrame(data) {
        const payload = JSON.stringify(data);

        //@ts-ignore
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

        //@ts-ignore
        const buffer = Buffer.alloc(payloadBytesOffset + payloadByteLength);

        // first byte
        buffer.writeUInt8(0b10000001, 0); // [FIN (1), RSV1 (0), RSV2 (0), RSV3 (0), Opсode (0x01 - text frame)]

        buffer[1] = payloadLength; // second byte - actual payload size (if <= 125 bytes) or 126, or 127

        if (payloadLength === 126) { // write actual payload length as a 16-bit unsigned integer
            buffer.writeUInt16BE(payloadByteLength, 2);
        } else if (payloadByteLength === 127) { // write actual payload length as a 64-bit unsigned integer
            //@ts-ignore
            buffer.writeBigUInt64BE(BigInt(payloadByteLength), 2);
        }

        buffer.write(payload, payloadBytesOffset);
        return buffer;
    }
    //@ts-ignore
    private parseFrame(buffer) {
        const firstByte = buffer.readUInt8(0);
        const opCode = firstByte & 0b00001111; // get last 4 bits of a byte

        if (opCode === OPCODES.close) {
            this.emit('close');
            return null;
        } else if (opCode !== OPCODES.text) {
            return;
        }

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
    //@ts-ignore
    private unmask(payload, maskingKey) {
        //@ts-ignore
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
    private emit(type: 'close'): void;
    private emit(type: 'data', data: WorkerRequest, reply: (buffer: any) => void): void;
    private emit(type: 'data' | 'close', data?: WorkerRequest, reply?: (buffer: any) => void) {
        super.emit(type, data, reply)
    }
    onMessage(callback: (data: WorkerRequest[], reply: (data: WorkerResponse[]) => void) => void): void {
        super.on("data", callback)
    }
    init() {
        //@ts-ignore
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

            socket.on('close', () => {
                console.log("closing socket...", socket);
            });
            //@ts-ignore
            socket.on('data', (buffer) => {
                this.emit('data', JSON.parse(this.parseFrame(buffer)), (data) => socket.write(this.createFrame(data)))
            });
            socket.write(responseHeaders.concat('\r\n').join('\r\n'));
        });
        this.server.listen(this.PORT);
    }
}
