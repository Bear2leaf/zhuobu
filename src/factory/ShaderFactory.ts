import CacheManager from "../manager/CacheManager.js";
import RenderingContext from "../renderingcontext/RenderingContext";
import Factory from "./Factory.js";


export default class ShaderFactory implements Factory {
    createShader(gl: RenderingContext, cacheManager: CacheManager, name: string) {
        const vert = cacheManager.getTxtCache().get(`static/shader/${name}.vert.sk`);
        const frag = cacheManager.getTxtCache().get(`static/shader/${name}.frag.sk`);
        if (vert === undefined || frag === undefined) {
            throw new Error("Shader text not found");
        }
        return gl.makeShader(vert, frag);
    }
}