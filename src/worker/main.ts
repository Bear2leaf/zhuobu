import MiniGameWorker from "./MiniGameWorker.js";
import SocketWorker from "./SocketWorker.js";


declare const worker: WechatMinigame.Worker;

const thread = (typeof worker === "undefined" ? new SocketWorker() : new MiniGameWorker(worker));

thread.postMessage([{ type: "WorkerInit" }]);