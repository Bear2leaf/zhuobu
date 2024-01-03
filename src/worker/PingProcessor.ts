import ConsoleProcessor from "./ConsoleProcessor.js";
import Worker from "./Worker.js";


export default class PingMessageDecoder extends ConsoleProcessor {
    decode(data: WorkerRequest): void {
        super.decode(data);
        if (this.getValid()) {
            this.setValid(this.getType() === "Ping");
        }
    }
    execute(self: Worker): void {
        super.execute(self);
        if (this.getValid()) {
            self.postMessage({ type: "Pong", args: [1, 2, 3] });
        }
    }
}