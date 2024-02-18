import Renderer from "./dist/renderer/Renderer.js";
import MinigameDevice from "./dist/device/MinigameDevice.js";

const device = new MinigameDevice();
const renderer = new Renderer(device);
load(device).then(() => {
    renderer.init();
});
device.createWorker("dist/worker/index.js", (data) => {
    console.log(data);
}, (sendMessage) => {
})
async function load() {
    await device.loadSubpackage();
    await renderer.load(device);
}