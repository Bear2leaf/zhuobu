
import type Engine from "../engine/main.js";
import type { m4 } from "../engine/third/twgl/m4";
import type { v3 } from "../engine/third/twgl/v3";
import { updateCalls } from "./callback/update.js";
import { workerCalls } from "./callback/worker.js";


export function initSubpackage(engine: Engine, m: typeof m4, v: typeof v3) {
    updateCalls.init(engine, m, v);
    workerCalls.init(engine, m, v);
}

export {
    workerCalls,
    updateCalls
}

