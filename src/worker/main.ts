import BrowserWorker from "./BrowserWorker.js";
import MiniGameWorker from "./MiniGameWorker.js";



const miniGameWorker = (globalThis as any).worker;
let processor = miniGameWorker ? new MiniGameWorker(miniGameWorker) : new BrowserWorker();
processor.postMessage({ type: "WorkerInit", args: [] });
