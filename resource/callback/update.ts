
import type Engine from "../../engine/main.js";
import type { m4 } from "../../engine/third/twgl/m4";
import type { v3 } from "../../engine/third/twgl/v3";


const module: {
    engine?: Engine
    m4?: typeof m4
    v3?: typeof v3
} = {

}

let time = 0;

export const updateCalls: Record<string, Function> = {
    init(engine: Engine, m: typeof m4, v: typeof v3) {
        module.engine = engine;
        module.m4 = m;
        module.v3 = v;
    },
    rotateY(objectProgramPairs: [string, string] | string[][]) {
        const engine = module.engine!;
        const m4 = module.m4!;
        const delta = 0.0002 * engine.ticker.delta;
        objectProgramPairs.forEach(objectProgramPair => {
            const name = typeof objectProgramPair === "string" ? objectProgramPair : objectProgramPair[0];
            const object = engine.objects.find(o => o.name === name)!;
            const model = object.model;
            m4.rotateY(model, name === "sky" ? -delta : delta, model);
        })
    },
    updateTime() {
        const engine = module.engine!;
        const delta = 0.0002 * engine.ticker.delta;
        time += delta;
        {
            engine.programs.forEach(program => {
                engine.renderer.updateUniform(program, "u_time", "1f", time);
            })
        }
    },
    updateModel(objectProgramPairs: [string, string] | string[][]) {
        const engine = module.engine!;
        objectProgramPairs.forEach(objectProgramPair => {
            const name = typeof objectProgramPair === "string" ? objectProgramPair : objectProgramPair[0];
            const pName = typeof objectProgramPair === "string" ? objectProgramPair : objectProgramPair[1];
            const program = engine.programs.find(p => p.name === pName)!;
            const object = engine.objects.find(o => o.name === name)!;
            const model = object.model;
            engine.renderer.updateUniform(program, "u_model", "Matrix4fv", ...model);
        })
    }
};
