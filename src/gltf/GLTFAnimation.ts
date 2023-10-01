import Node from "../component/Node.js";
import GLTF from "./GLTF.js";
import GLTFAnimationChannel from "./GLTFAnimationChannel.js";
import GLTFAnimationSampler from "./GLTFAnimationSampler.js";

export default class GLTFAnimation {
    private readonly channels: readonly GLTFAnimationChannel[];
    private readonly samplers: readonly GLTFAnimationSampler[];
    private readonly name: string;
    constructor(animation: GLTFAnimation) {
        this.channels = animation.channels.map((channel) => new GLTFAnimationChannel(channel));
        this.samplers = animation.samplers.map((sampler) => new GLTFAnimationSampler(sampler));
        this.name = animation.name;
    }
    getChannels(): readonly GLTFAnimationChannel[] {
        return this.channels;
    }
    getSamplers(): readonly GLTFAnimationSampler[] {
        return this.samplers;
    }
    createBuffers(gltf: GLTF): void {
        this.samplers.forEach((sampler) => {
            const input = gltf.getDataByAccessorIndex(sampler.getInput());
            const output = gltf.getDataByAccessorIndex(sampler.getOutput());
            if (!(input instanceof Float32Array)) {
                throw new Error("input is not Float32Array");
            }
            if (!(output instanceof Float32Array)) {
                throw new Error("output is not Float32Array");
            }
            sampler.setInputBuffer(input);
            sampler.setOutputBuffer(output);
        });
        this.channels.forEach((channel) => {
            channel.getTarget().setAnimationNode(gltf.getNodeByIndex(channel.getTarget().getNode()).getNode());
        });
    }
}