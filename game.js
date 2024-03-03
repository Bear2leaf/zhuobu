import MinigameDevice from "./dist/engine/device/MinigameDevice.js";
import Engine from "./dist/engine/main.js";

const device = new MinigameDevice();
const engine = new Engine(device);
engine.start();