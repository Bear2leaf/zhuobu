import RenderingContext from "../renderingcontext/RenderingContext";


export default class ShaderFactory {
    private readonly txtCache: Map<string, string>;
    private readonly gl: RenderingContext;
    constructor(txtCache: Map<string, string>, gl: RenderingContext) {
        this.txtCache = txtCache;
        this.gl = gl;
    }
    createShader(name: string) {
        const vert = this.txtCache.get(`static/shader/${name}.vert.sk`);
        const frag = this.txtCache.get(`static/shader/${name}.frag.sk`);
        if (vert === undefined || frag === undefined) {
            throw new Error("Shader text not found");
        }
        return this.gl.makeShader(name, vert, frag);
    }
}