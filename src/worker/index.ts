import BrowserProcessor from "./BrowserProcessor.js";
import MiniGameProcessor from "./MiniGameProcessor.js";



const miniGameWorker = (globalThis as any).worker;
let processor = miniGameWorker ? new MiniGameProcessor(miniGameWorker) : new BrowserProcessor();
processor.postMessage({ type: "WorkerInit", args: [], subject: "Console" });
