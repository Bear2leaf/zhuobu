import WhaleMesh from "../drawobject/WhaleMesh.js";
import { Vec3, Vec4 } from "../geometry/Vector.js";
import GLTFAnimation from "../gltf/GLTFAnimation.js";
import GLTFAnimationSampler from "../gltf/GLTFAnimationSampler.js";
import AnimationController from "./AnimationController.js";

export default class GLTFAnimationController extends AnimationController {

    private animationData?: GLTFAnimation;
    setAnimationData(animationData: GLTFAnimation): void {
        this.animationData = animationData;
    }
    getAnimationData(): GLTFAnimation {
        if (this.animationData === undefined) {
            throw new Error("animationData is undefined");
        }
        return this.animationData;
    }
    animGLTF() {

        const channels = this.getAnimationData().getChannels();
        channels.forEach((channel) => {
            const sampler = this.getSamplerByIndex(channel.getSampler());
            const target = channel.getTarget();
            const node = target.getAnimationNode();
            const path = target.getPath();
            const inputBuffer = sampler.getInputBuffer();
            const outputBuffer = sampler.getOutputBuffer();
            const localTime = (this.getTime() / 1000) % inputBuffer[inputBuffer.length - 1];
            // find the nearest index
            let bufferIndex = sampler.getNearestIndexFromTime(localTime);
            // get the value from the output buffer
            const previousTime = inputBuffer[bufferIndex];
            const nextTime = inputBuffer[bufferIndex + 1];

            let interpolationValue = (localTime - previousTime) / (nextTime - previousTime);
            // if there is no matrix saved for this joint
            const trs = node.getSource();
            if (!trs) {
                throw new Error("source is undefined");
            }
            if (path === "translation") {
                const currentBuffer = [...outputBuffer.slice(bufferIndex * 3, bufferIndex * 3 + 6)]
                const previousTranslation = new Vec3(...currentBuffer.slice(0, 3));
                const nextTranslation = new Vec3(...currentBuffer.slice(3, 6));
                const currentTranslation = nextTranslation.subtract(previousTranslation).multiply(interpolationValue).add(previousTranslation);
                trs.getPosition().from(currentTranslation);
            } else if (path === "rotation") {
                const currentBuffer = [...outputBuffer.slice(bufferIndex * 4, bufferIndex * 4 + 8)]
                const previous = new Vec4(...currentBuffer.slice(0, 4));
                const next = new Vec4(...currentBuffer.slice(4, 8));
                const current = next.subtract(previous).multiply(interpolationValue).add(previous);
                trs.getRotation().from(current);
            } else if (path === "scale") {
                const currentBuffer = [...outputBuffer.slice(bufferIndex * 3, bufferIndex * 3 + 6)]
                const previous = new Vec3(...currentBuffer.slice(0, 3));
                const next = new Vec3(...currentBuffer.slice(3, 6));
                const current = next.subtract(previous).multiply(interpolationValue).add(previous);
                trs.getScale().from(current);
            } else {
                throw new Error("path not found");
            }
        });
    }
    getSamplerByIndex(index: number): GLTFAnimationSampler {
        const sampler = this.getAnimationData().getSamplers()[index];
        if (sampler === undefined) {
            throw new Error("sampler not found");
        }
        return sampler;

    }
}