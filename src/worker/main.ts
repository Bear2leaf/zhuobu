import MiniGameWorker, { MiniGameWorkerType } from "./MiniGameWorker.js";
import SocketWorker from "./SocketWorker.js";



const miniGameWorker = (globalThis as unknown as { worker: MiniGameWorkerType }).worker;
(miniGameWorker ? new MiniGameWorker(miniGameWorker) : new SocketWorker());
