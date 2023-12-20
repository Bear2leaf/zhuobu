import { flatten, Vec3, Vec4 } from "../geometry/Vector.js";
import { UniformBindingIndex as UniformBinding } from "../renderingcontext/RenderingContext.js";
import Shader from "./Shader.js";

export default class GLShader implements Shader {
    private readonly gl: WebGL2RenderingContext;
    private readonly program: WebGLProgram;
    private readonly locMap: Map<string, WebGLUniformLocation | null>;
    private readonly blockIndexMap: Map<UniformBinding, number>;
    private readonly invalidBlockIndex = (-1 >>> 0);
    constructor(gl: WebGL2RenderingContext, vs: string, fs: string) {
        this.gl = gl;
        this.locMap = new Map();
        this.blockIndexMap = new Map();
        const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        if (!vertexShader || !fragmentShader) {
            throw new Error("shader not created");
        }
        this.gl.shaderSource(vertexShader, vs);
        this.gl.shaderSource(fragmentShader, fs);
        this.gl.compileShader(vertexShader);
        this.gl.compileShader(fragmentShader);
        if (!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS)) {
            throw new Error(this.gl.getShaderInfoLog(vertexShader) || "vertex shader compile error");
        }
        if (!this.gl.getShaderParameter(fragmentShader, this.gl.COMPILE_STATUS)) {
            throw new Error(this.gl.getShaderInfoLog(fragmentShader) || "fragment shader compile error");
        }
        const program = this.gl.createProgram();
        if (!program) {
            throw new Error("program not created")
        }
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            throw new Error(this.gl.getProgramInfoLog(program) || "program link error");
        }
        this.program = program;
    }
    setMatrix4fv(name: string, data: Float32Array) {
        let loc = this.locMap.get(name);
        if (loc !== undefined) {
        } else {
            loc = this.gl.getUniformLocation(this.program, name);
            this.locMap.set(name, loc);
        }
        this.gl.uniformMatrix4fv(loc, false, data)
    }
    setVector4f(name: string, data: Vec4) {
        let loc = this.locMap.get(name);
        if (loc !== undefined) {
        } else {
            loc = this.gl.getUniformLocation(this.program, name);
            this.locMap.set(name, loc);
        }
        this.gl.uniform4fv(loc, flatten([data]))
    }
    setVector3f(name: string, data: Vec3) {
        let loc = this.locMap.get(name);
        if (loc !== undefined) {
        } else {
            loc = this.gl.getUniformLocation(this.program, name);
            this.locMap.set(name, loc);
        }
        this.gl.uniform3fv(loc, flatten([data]))
    }
    setInteger(name: string, data: number) {
        let loc = this.locMap.get(name);
        if (loc !== undefined) {
        } else {
            loc = this.gl.getUniformLocation(this.program, name);
            this.locMap.set(name, loc);
        }
        this.gl.uniform1i(loc, data)
    }
    setFloat(name: string, data: number) {
        let loc = this.locMap.get(name);
        if (loc !== undefined) {
        } else {
            loc = this.gl.getUniformLocation(this.program, name);
            this.locMap.set(name, loc);
        }
        this.gl.uniform1f(loc, data)
    }
    use() {
        this.gl.useProgram(this.program);
    }
    bindUniform(index: UniformBinding): void {
        let blockIndex = this.blockIndexMap.get(index);
        if (blockIndex !== this.invalidBlockIndex) {
            if (blockIndex === undefined) {
                blockIndex = this.gl.getUniformBlockIndex(this.program, UniformBinding[index]);
                this.blockIndexMap.set(index, blockIndex);
            }
            this.gl.uniformBlockBinding(this.program, blockIndex, index);
        } else {
            throw Error("block index is invalid");
        }


        // const activeUniformBlocks = this.gl.getProgramParameter(this.program, this.gl.ACTIVE_UNIFORM_BLOCKS);
        // for (let i = 0; i < activeUniformBlocks; i++) {
        //     const name = this.gl.getActiveUniformBlockName(this.program, i)!;
        //     const blockIndex = this.gl.getUniformBlockIndex(this.program, name)!;
        //     const activeUniforms = this.gl.getActiveUniformBlockParameter(this.program, blockIndex, this.gl.UNIFORM_BLOCK_ACTIVE_UNIFORMS)!;
        //     const activeUniformIndices = this.gl.getActiveUniformBlockParameter(this.program, blockIndex, this.gl.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES)!;
        //     const bindding = this.gl.getActiveUniformBlockParameter(this.program, blockIndex, this.gl.UNIFORM_BLOCK_BINDING)!;
        //     const dataSize = this.gl.getActiveUniformBlockParameter(this.program, blockIndex, this.gl.UNIFORM_BLOCK_DATA_SIZE)!;
        //     const referencedByFrag = this.gl.getActiveUniformBlockParameter(this.program, blockIndex, this.gl.UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER)!;
        //     const referencedByVert = this.gl.getActiveUniformBlockParameter(this.program, blockIndex, this.gl.UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER)!;

        //     console.log({
        //         name,
        //         blockIndex,
        //         activeUniforms,
        //         activeUniformIndices: [...activeUniformIndices],
        //         bindding,
        //         dataSize,
        //         referencedByFrag,
        //         referencedByVert,
        //     })
        // }

    }
}

