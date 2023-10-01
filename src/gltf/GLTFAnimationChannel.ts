import GLTFAnimationChannelTarget from "./GLTFAnimationChannelTarget.js";

export default class GLTFAnimationChannel {
    private readonly sampler: number;
    private readonly target: GLTFAnimationChannelTarget;
    constructor(channel: GLTFAnimationChannel) {
        this.sampler = channel.sampler;
        this.target = new GLTFAnimationChannelTarget(channel.target);
    }
    getTarget(): GLTFAnimationChannelTarget {
        return this.target;
    }
    getSampler(): number {
        return this.sampler;
    }
}