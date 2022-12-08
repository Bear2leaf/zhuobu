import { device, gl } from "./global.js";
import Renderer from "./Renderer.js";
import Shader from "./Shader.js";
import { post_posscessing } from "./shader_source.js";
import Texture from "./Texture.js";

export default class PostPocessor implements Renderer {
    private readonly shader: Shader;
    private vao?: WebGLVertexArrayObject;
    private vbo?: WebGLBuffer;
    private readonly msfbo: WebGLFramebuffer;
    private readonly fbo: WebGLFramebuffer;
    private readonly rbo: WebGLRenderbuffer;
    private readonly width: number;
    private readonly height: number;
    private readonly texture: Texture;
    private step: number;
    confuse: boolean;
    chaos: boolean;
    shake: boolean;
    constructor() {
        this.step = 0;
        const width = device.getWindowInfo().windowWidth;
        const height = device.getWindowInfo().windowHeight;
        this.texture = new Texture()
        this.confuse = false;
        this.chaos = false;
        this.shake = false;
        this.shader = new Shader();
        this.width = width;
        this.height = height;
        this.msfbo = gl.createFramebuffer()!;
        this.fbo = gl.createFramebuffer()!;
        this.rbo = gl.createRenderbuffer()!;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.msfbo);
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.rbo);
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, 4, gl.RGBA8, width, height);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, this.rbo);
        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
            console.error('ERROR::POSTPROCESSOR: Failed to initialize MSFBO');
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
        this.texture.generate();
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture.tex, 0)
        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
            console.error('ERROR::POSTPROCESSOR: Failed to initialize FBO');
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        

    }
    async init() {

        const shader = post_posscessing;
        this.shader.compile(shader.vs, shader.fs);
        this.vao = gl.createVertexArray()!;
        this.vbo = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            // pos      // tex
            -1.0, -1.0, 0.0, 0.0,
            1.0, 1.0, 1.0, 1.0,
            -1.0, 1.0, 0.0, 1.0,

            -1.0, -1.0, 0.0, 0.0,
            1.0, -1.0, 1.0, 0.0,
            1.0, 1.0, 1.0, 1.0
        ]), gl.STATIC_DRAW);

        gl.bindVertexArray(this.vao);
        gl.enableVertexAttribArray(0)
        gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);

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
        gl.uniform2fv(gl.getUniformLocation(this.shader.program!, "offsets"), offsets, 0, 2);
        const edge_kernel = [
            -1.0, -1.0, -1.0,
            -1.0, 8.0, -1.0,
            -1.0, -1.0, -1.0];
        gl.uniform1fv(gl.getUniformLocation(this.shader.program!, "edge_kernel"), edge_kernel);
        const blur_kernel = [
            1.0 / 16.0, 2.0 / 16.0, 1.0 / 16.0,
            2.0 / 16.0, 4.0 / 16.0, 2.0 / 16.0,
            1.0 / 16.0, 2.0 / 16.0, 1.0 / 16.0
        ]
        gl.uniform1fv(gl.getUniformLocation(this.shader.program!, "blur_kernel"), blur_kernel);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

    }
    beginRender() {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.msfbo);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
    endRender() {
        gl.bindFramebuffer(gl.READ_FRAMEBUFFER, this.msfbo);
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.fbo);
        gl.blitFramebuffer(0, 0, this.width, this.height, 0, 0, this.width, this.height, gl.COLOR_BUFFER_BIT, gl.NEAREST);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    }
    render() {
        // set uniforms/options
        this.shader.use();
        this.shader.setFloat("time", (this.step++) / 100);
        this.shader.setInteger("confuse", ~~this.confuse);
        this.shader.setInteger("chaos", ~~this.chaos);
        this.shader.setInteger("shake", ~~this.shake);
        // render textured quad
        gl.activeTexture(gl.TEXTURE0);
        this.texture.bind();
        gl.bindVertexArray(this.vao!);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.bindVertexArray(null);
    }
}