import ResourceManager from "./resource_manager.js";
import Shader from "./shader.js";
import Texture2D from "./texture.js";

export default class PostProcessor {
    private readonly shader: Shader;
    private vao?: WebGLVertexArrayObject;
    private positionLocation?: number;
    private positionBuffer?: WebGLBuffer;
    private readonly msfbo: WebGLFramebuffer;
    private readonly fbo: WebGLFramebuffer;
    private readonly rbo: WebGLRenderbuffer;
    private readonly width: number;
    private readonly height: number;
    private readonly texture: Texture2D;
    confuse: boolean;
    chaos: boolean;
    shake: boolean;
    constructor(shader: Shader, width: number, height: number) {
        this.texture = new Texture2D()
        this.confuse = false;
        this.chaos = false;
        this.shake = false;
        this.shader = shader;
        this.width = width;
        this.height = height;
        this.msfbo = ResourceManager.gl.createFramebuffer()!;
        this.fbo = ResourceManager.gl.createFramebuffer()!;
        this.rbo = ResourceManager.gl.createRenderbuffer()!;
        ResourceManager.gl.bindFramebuffer(ResourceManager.gl.FRAMEBUFFER, this.msfbo);
        ResourceManager.gl.bindRenderbuffer(ResourceManager.gl.RENDERBUFFER, this.rbo);
        ResourceManager.gl.renderbufferStorageMultisample(ResourceManager.gl.RENDERBUFFER, 4, ResourceManager.gl.RGB8, width, height);
        ResourceManager.gl.framebufferRenderbuffer(ResourceManager.gl.FRAMEBUFFER, ResourceManager.gl.COLOR_ATTACHMENT0, ResourceManager.gl.RENDERBUFFER, this.rbo);
        if (ResourceManager.gl.checkFramebufferStatus(ResourceManager.gl.FRAMEBUFFER) !== ResourceManager.gl.FRAMEBUFFER_COMPLETE) {
            console.error('ERROR::POSTPROCESSOR: Failed to initialize MSFBO');
        }
        ResourceManager.gl.bindFramebuffer(ResourceManager.gl.FRAMEBUFFER, this.fbo);
        this.texture.generate(null, width, height);
        ResourceManager.gl.framebufferTexture2D(ResourceManager.gl.FRAMEBUFFER, ResourceManager.gl.COLOR_ATTACHMENT0, ResourceManager.gl.TEXTURE_2D, this.texture.tex, 0)
        if (ResourceManager.gl.checkFramebufferStatus(ResourceManager.gl.FRAMEBUFFER) !== ResourceManager.gl.FRAMEBUFFER_COMPLETE) {
            console.error('ERROR::POSTPROCESSOR: Failed to initialize FBO');
        }

        ResourceManager.gl.bindFramebuffer(ResourceManager.gl.FRAMEBUFFER, null)
        
        this.init();

        this.shader.setInteger('scene', 0, true);
        const offset = 1 / 300;
        const offsets = [
            -offset, offset,  // top-left
            0.0, offset,  // top-center
            offset, offset,  // top-right
            -offset, 0.0,  // center-left
            0.0, 0.0,  // center-center
            offset, 0.0,  // center - right
            -offset, -offset,  // bottom-left
            0.0, -offset,  // bottom-center
            offset, -offset     // bottom-right    
        ];
        ResourceManager.gl.uniform2fv(ResourceManager.gl.getUniformLocation(this.shader.program!, "offsets"), offsets, 0, 2);
        const edge_kernel = [
            -1.0, -1.0, -1.0,
            -1.0, 8.0, -1.0,
            -1.0, -1.0, -1.0];
        ResourceManager.gl.uniform1fv(ResourceManager.gl.getUniformLocation(this.shader.program!, "edge_kernel"), edge_kernel);
        const blur_kernel = [
            1.0 / 16.0, 2.0 / 16.0, 1.0 / 16.0,
            2.0 / 16.0, 4.0 / 16.0, 2.0 / 16.0,
            1.0 / 16.0, 2.0 / 16.0, 1.0 / 16.0
        ]
        ResourceManager.gl.uniform1fv(ResourceManager.gl.getUniformLocation(this.shader.program!, "blur_kernel"), blur_kernel);
    }
    init() {

        this.vao = ResourceManager.gl.createVertexArray()!;
        this.positionLocation = ResourceManager.gl.getAttribLocation(this.shader.program!, 'a_position')
        this.positionBuffer = ResourceManager.gl.createBuffer()!;
        ResourceManager.gl.bindBuffer(ResourceManager.gl.ARRAY_BUFFER, this.positionBuffer)
        ResourceManager.gl.bufferData(ResourceManager.gl.ARRAY_BUFFER, new Float32Array([
            // pos      // tex
            -1.0, -1.0, 0.0, 0.0,
            1.0, 1.0, 1.0, 1.0,
            -1.0, 1.0, 0.0, 1.0,

            -1.0, -1.0, 0.0, 0.0,
            1.0, -1.0, 1.0, 0.0,
            1.0, 1.0, 1.0, 1.0
        ]), ResourceManager.gl.STATIC_DRAW);

        ResourceManager.gl.bindVertexArray(this.vao);
        ResourceManager.gl.enableVertexAttribArray(this.positionLocation)
        ResourceManager.gl.vertexAttribPointer(this.positionLocation, 4, ResourceManager.gl.FLOAT, false, 0, 0);

        ResourceManager.gl.bindBuffer(ResourceManager.gl.ARRAY_BUFFER, null);

    }
    beginRender() {
        ResourceManager.gl.bindFramebuffer(ResourceManager.gl.FRAMEBUFFER, this.msfbo);
        ResourceManager.gl.clearColor(0, 0, 0, 1);
        ResourceManager.gl.clear(ResourceManager.gl.COLOR_BUFFER_BIT);
    }
    endRender() {
        ResourceManager.gl.bindFramebuffer(ResourceManager.gl.READ_FRAMEBUFFER, this.msfbo);
        ResourceManager.gl.bindFramebuffer(ResourceManager.gl.DRAW_FRAMEBUFFER, this.fbo);
        ResourceManager.gl.blitFramebuffer(0, 0, this.width, this.height, 0, 0, this.width, this.height, ResourceManager.gl.COLOR_BUFFER_BIT, ResourceManager.gl.NEAREST);
        ResourceManager.gl.bindFramebuffer(ResourceManager.gl.FRAMEBUFFER, null);

    }
    render(time: number) {
        // set uniforms/options
        this.shader.use();
        this.shader.setFloat("time", time);
        this.shader.setInteger("confuse", ~~this.confuse);
        this.shader.setInteger("chaos", ~~this.chaos);
        this.shader.setInteger("shake", ~~this.shake);
        // render textured quad
        ResourceManager.gl.activeTexture(ResourceManager.gl.TEXTURE0);
        this.texture.bind();
        ResourceManager.gl.bindVertexArray(this.vao!);
        ResourceManager.gl.drawArrays(ResourceManager.gl.TRIANGLES, 0, 6);
    }

}