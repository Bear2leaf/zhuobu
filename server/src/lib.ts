
import Engine from "../../engine/main"
import BrowserDevice from "../../engine/device/BrowserDevice"
import Worker from '../../worker/index?worker'

export const engineContainer: {
    engine: Engine | null
} = {
    engine: null
}

export function createGame(canvasGL: HTMLCanvasElement, canvas2D: HTMLCanvasElement) {
    if (engineContainer.engine) {
        return;
    }
    const device = new BrowserDevice(canvasGL, canvas2D);
    device.setWorker(new Worker());
    const engine = new Engine(device);
    engine.start();
    engineContainer.engine = engine;
}

export {
    Engine,
    BrowserDevice,
    Worker
}