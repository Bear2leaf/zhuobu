import SocketState from "./state/SocketState.js";
import StandaloneState from "./state/StandaloneState.js";
import State from "./state/State.js";
import BrowserWorker from "./device/BrowserWorker.js";
import MinigameWorker from "./device/MinigameWorker.js";
import WorkerDevice from "./device/WorkerDevice.js";

console.log("worker created.");
declare const worker : WechatMinigame.Worker;
let device: WorkerDevice;
let state: State;
if (typeof worker === 'undefined') {
    device = new BrowserWorker();
    state = new StandaloneState(device);
} else {
    device = new MinigameWorker();
    state = new StandaloneState(device);
}
state.init();