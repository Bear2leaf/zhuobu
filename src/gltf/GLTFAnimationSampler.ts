export default class GLTFAnimationSampler {
    private readonly input: number;
    private readonly interpolation: string;
    private readonly output: number;
    private inputBuffer?: Float32Array;
    private outputBuffer?: Float32Array;

    constructor(sampler: GLTFAnimationSampler) {
        this.input = sampler.input;
        this.interpolation = sampler.interpolation;
        this.output = sampler.output;
    }
    getInput(): number {
        return this.input;
    }
    getInterpolation(): string {
        return this.interpolation;
    }
    getOutput(): number {
        return this.output;
    }
    setInputBuffer(inputBuffer: Float32Array): void {
        this.inputBuffer = inputBuffer;
    }
    getInputBuffer(): Float32Array {
        if (this.inputBuffer === undefined) {
            throw new Error("inputBuffer is undefined");
        }
        return this.inputBuffer;
    }
    setOutputBuffer(outputBuffer: Float32Array): void {
        this.outputBuffer = outputBuffer;
    }
    getOutputBuffer(): Float32Array {
        if (this.outputBuffer === undefined) {
            throw new Error("outputBuffer is undefined");
        }
        return this.outputBuffer;
    }
    getNearestIndexFromTime(time: number): number {
        const input = this.getInputBuffer();
        if (input.length > 1) {
            for (let i = 0; i < input.length - 1; ++i) {
                if (time >= input[i] && time < input[i + 1]) {
                    return i;
                } else if (time >= input[i] && time >= input[i + 1] && i === input.length - 2) {
                    return i;
                } else if (time < input[i] && time < input[i + 1] && i === 0) {
                    return i;
                }

            }
        }
        throw new Error("index not found");
    }



}