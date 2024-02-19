import Renderer from "./dist/renderer/Renderer.js";
import MinigameDevice from "./dist/device/MinigameDevice.js";
import WorkerManager from "./dist/manager/WorkerManager.js";

const device = new MinigameDevice();
const renderer = new Renderer(device);
const workerManager = new WorkerManager();
workerManager.updateModelTranslation = renderer.updateModelTranslation.bind(renderer);
load(device).then(() => {
    renderer.init();
    workerManager.init(device);
});
async function load() {
    await device.loadSubpackage();
    await renderer.load(device);
}