import BrowserWorker from "./BrowserWorker.js";
import MiniGameWorker from "./MiniGameWorker.js";

console.log("worker init");
declare const worker : WechatMinigame.Worker;

if (typeof worker === 'undefined') {
    new BrowserWorker();
} else {
    new MiniGameWorker();
}