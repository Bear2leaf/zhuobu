import SocketState from "./SocketState.js";
import StandaloneState from "./StandaloneState.js";
import State from "./State.js";
import BrowserWorker from "./BrowserWorker.js";
import MinigameWorker from "./MinigameWorker.js";
import WorkerDevice from "./WorkerDevice.js";

console.log("worker created.");
declare const worker : WechatMinigame.Worker;
let device: WorkerDevice;
let state: State;
if (typeof worker === 'undefined') {
    device = new BrowserWorker();
    state = new SocketState(device);
} else {
    device = new MinigameWorker();
    state = new StandaloneState(device);
}
state.init();