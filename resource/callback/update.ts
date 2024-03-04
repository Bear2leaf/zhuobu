
import type Engine from "../../engine/main.js";
import type { m4 } from "../../engine/third/twgl/m4";


const module: {
    engine?: Engine
    m4?: typeof m4
} = {

}

export const updateCalls: Record<string, Function> = {
    init(engine: Engine, m: typeof m4) {
        module.engine = engine;
        module.m4 = m;
    },
    rotateTerrain() {
        const engine = module.engine!;
        const m4 = module.m4!;
        {
            const name = "terrain";
            const program = engine.programs.find(p => p.name === name)!;
            const object = engine.objects.find(o => o.name === name)!;
            const model = object.model;
            m4.rotateY(model, 0.001 * engine.ticker.delta, model);
            engine.renderer.updateUniform(program, "u_model", "Matrix4fv", ...model);
        }
        {
            const name = "water";
            const program = engine.programs.find(p => p.name === name)!;
            const object = engine.objects.find(o => o.name === name)!;
            const model = object.model;
            m4.rotateY(model, 0.001 * engine.ticker.delta, model);
            engine.renderer.updateUniform(program, "u_model", "Matrix4fv", ...model);
        }
        {
            const name = "sky";
            const program = engine.programs.find(p => p.name === name)!;
            const object = engine.objects.find(o => o.name === name)!;
            const model = object.model;
            m4.rotateY(model, -0.001 * engine.ticker.delta, model);
            engine.renderer.updateUniform(program, "u_model", "Matrix4fv", ...model);
        }
    }
};
