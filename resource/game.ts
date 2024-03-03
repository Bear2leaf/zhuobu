
import type Engine from "../engine/main.js";
import type { m4 } from "../engine/third/twgl/m4";
import { updateCalls } from "./callback/update.js";
import { workerCalls } from "./callback/worker.js";


export function initSubpackage(engine: Engine, m: typeof m4) {
    updateCalls.init(engine, m);
    workerCalls.init(engine, m);
}

export {
    workerCalls,
    updateCalls
}

