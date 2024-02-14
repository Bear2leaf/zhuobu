import GLTFAnimationChannel from "./GLTFAnimationChannel.js";
import GLTFAnimationSampler from "./GLTFAnimationSampler.js";

export default class GLTFAnimation {
    readonly channels: readonly GLTFAnimationChannel[];
    readonly samplers: readonly GLTFAnimationSampler[];
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
}