
import type Engine from "../../engine/main.js";
import type { m4 } from "../../engine/third/twgl/m4";
import type { v3 } from "../../engine/third/twgl/v3";


const module: {
    engine?: Engine
    m4?: typeof m4
    v3?: typeof v3
} = {

}

export const workerCalls = {
    init(engine: Engine, m: typeof m4, v: typeof v3) {
        module.engine = engine;
        module.m4 = m;
        module.v3 = v;
    },
    updateModelAnimation(animation: boolean): void {

        const engine = module.engine!;
        engine.stop();
        if (animation) {
            engine.start();
        }
    },

    updateUpdateCalls(callbackNames: UpdateCalls): void {
        const engine = module.engine!;
        const m4 = module.m4!;
        engine.updateCalls.splice(0, engine.updateCalls.length, ...callbackNames);
    },
    updateRenderCalls(callbacks: [string, string, string, string | null, boolean, number | null][]): void {

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
    updateCameras(cameras: Camera[]): void {
        const engine = module.engine!;
        for (const iterator of cameras) {
            Object.assign(engine.cameras.find(c => c.name === iterator.name)!, iterator);
        }
    },
    initAttributes(objectName: string, programName: string, name: string, type: GLType, size: number, attribute: number[], divisor?: number): void {

        const engine = module.engine!;
        const m4 = module.m4!;
        const object = engine.objects.find(o => o.name === objectName)!;
        const program = engine.programs.find(p => p.name === programName)!;
        engine.renderer.createAttributes(object, program, name, type, size, attribute, divisor);
    },
    updateAttributes(objectName: string, name: string, attribute: number[]): void {
        const engine = module.engine!;
        const object = engine.objects.find(o => o.name === objectName)!;
        engine.renderer.updateAttributes(object, name, attribute)
    },
    initIndices(objectName: string, programName: string, name: string, attribute: number[]): void {
        const engine = module.engine!;
        const m4 = module.m4!;
        const object = engine.objects.find(o => o.name === objectName)!;
        const program = engine.programs.find(p => p.name === programName)!;
        engine.renderer.createIndices(object, program, name, attribute);
    },
    onEngineLoaded(textureFBOBindings: string[][]) {
        const engine = module.engine!;
        const renderer = engine.renderer;
        const m4 = module.m4!;
        engine.programs.forEach(program => renderer.initShaderProgram(program))
        engine.objects.forEach(object => renderer.createDrawobject(object))
        engine.textures.forEach(texture => {
            renderer.createTexture(texture);
        });
        for (const iterator of textureFBOBindings) {
            const fboName = iterator[0];
            const fboTextures = iterator.slice(1);
            renderer.createFramebuffer(fboName, engine.framebuffers.find(f => f.name === fboName)!,
                ...fboTextures.map(t => engine.textures.find(tex => tex.name === t)!)
            );
        }
    }
};
