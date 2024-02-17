import BrowserWorker from "./BrowserWorker.js";
import MinigameWorker from "./MinigameWorker.js";

console.log("worker init");
declare const worker : WechatMinigame.Worker;

if (typeof worker === 'undefined') {
    new BrowserWorker();
} else {
    new MinigameWorker();
}