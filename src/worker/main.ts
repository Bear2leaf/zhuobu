import BrowserWorker from "./BrowserWorker.js";
import MiniGameWorker, { MiniGameWorkerType } from "./MiniGameWorker.js";



const miniGameWorker = (globalThis as unknown as {worker: MiniGameWorkerType}).worker;
let processor = miniGameWorker ? new MiniGameWorker(miniGameWorker) : new BrowserWorker();
processor.postMessage({ type: "WorkerInit", args: [] });
