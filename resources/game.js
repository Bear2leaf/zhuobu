const m = {};
export function resourcesInited(module) {
    console.log("resourcesInited");
    Object.assign(m, module);
}
export function rotateTerrain() {
    const m4 = m.m4;
    const engine = m.engine;
    const name = "terrain";
    const program = engine.programs.find(p => p.name === name);
    const object = engine.objects.find(o => o.name === name);
    const model = object.model;
    m4.rotateY(model, 0.001 * engine.ticker.delta, model);
    engine.renderer.updateUniform(program, "u_model", "Matrix4fv", ...model);
}
