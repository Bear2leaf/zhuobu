
import type Engine from "../src/engine/main.js";
import type { m4 } from "../src/engine/third/twgl/m4";

const module: {
    engine?: Engine
    m4?: typeof m4
} = {

}

export function initSubpackage(engine: Engine, m: typeof m4) {
    module.engine = engine;
    module.m4 = m;
}

export const updateCalls: Record<string, Function> = {
    rotateTerrain() {
        const engine = module.engine!;
        const m4 = module.m4!;
        const name = "terrain";
        const program = engine.programs.find(p => p.name === name)!;
        const object = engine.objects.find(o => o.name === name)!;
        const model = object.model;
        m4.rotateY(model, 0.001 * engine.ticker.delta, model);
        engine.renderer.updateUniform(program, "u_model", "Matrix4fv", ...model);
    }
}

export const workerCalls = {
    updateCamera(
        programName: string,
        eye: [number, number, number],
        target: [number, number, number],
        up: [number, number, number],
        fieldOfViewYInRadians: number,
        aspect: number,
        zNear: number,
        zFar: number,
    ) {
        const engine = module.engine!;
        const m4 = module.m4!;
        const program = engine.programs.find(p => p.name === programName)!;
        const viewInverse = m4.identity();
        const projection = m4.identity();
        m4.inverse(m4.lookAt(eye, target, up), viewInverse);
        m4.perspective(fieldOfViewYInRadians, aspect, zNear, zFar, projection);
        engine.renderer.updateUniform(program, "u_viewInverse", "Matrix4fv", ...viewInverse)
        engine.renderer.updateUniform(program, "u_projection", "Matrix4fv", ...projection)
    }
    ,
    updateModelAnimation(animation: boolean): void {

        const engine = module.engine!;
        const m4 = module.m4!;
        engine.ticker.pause = !animation;
        const timer = requestAnimationFrame(time => {
            engine.ticker.now = time;
            engine.ticker.tick(time)
        });
        if (!animation) {
            cancelAnimationFrame(timer)
        }
    }
    ,
    updateUpdateCalls(callbackNames: "rotateTerrain"[]): void {
        const engine = module.engine!;
        const m4 = module.m4!;
        engine.updateCalls.splice(0, engine.updateCalls.length, ...callbackNames);
    },
    updateRenderCalls(callbacks: [string, string, string, [string, GLUniformType, m4.Mat4][]][]): void {

        const engine = module.engine!;
        const m4 = module.m4!;
        engine.renderCalls.splice(0, engine.renderCalls.length, ...callbacks);
    },
    updateUniforms(programName: string, uniformName: string, type: GLUniformType, values: number[]): void {

        const engine = module.engine!;
        const m4 = module.m4!;
        const program = engine.programs.find(p => p.name === programName)!;
        engine.renderer.updateUniform(program, uniformName, type, ...values);
    },
    updateInstanceCount(objectName: string, count: number): void {

        const engine = module.engine!;
        const m4 = module.m4!;
        const object = engine.objects.find(o => o.name === objectName)!;
        object.instanceCount = count;
    },
    updateModelTranslation(translation: number[]): void {
        const engine = module.engine!;
        const m4 = module.m4!;
        const model = engine.objects.find(o => o.name === "terrain")?.model;
        if (model) {
            model[12] = translation[0];
            model[13] = translation[1];
            model[14] = translation[2];
        }

    },
    initAttributes(objectName: string, programName: string, name: string, type: GLType, size: number, attribute: number[], divisor?: number): void {

        const engine = module.engine!;
        const m4 = module.m4!;
        const object = engine.objects.find(o => o.name === objectName)!
        const program = engine.programs.find(p => p.name === programName)!
        engine.renderer.createAttributes(object, program, name, type, size, attribute, divisor);
    }

}