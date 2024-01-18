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
    slerp(a: Vec4, b: Vec4, t: number): Vec4 {
        // we use slerp before, in fact we can use lerp here.
        let dot = a.clone().dot(b);
        if (dot < 0.0) {
            b.multiply(-1);
            dot = -dot;
        }
        if (dot > 1.000000) {
            return a.clone().add((b.clone().subtract(a.clone()).multiply(t)).normalize());
        }
        const theta = Math.acos(dot);
        const sinTheta = Math.sin(theta);
        const sinThetaInv = 1.0 / sinTheta;
        const c0 = Math.sin((1 - t) * theta) * sinThetaInv;
        const c1 = Math.sin(t * theta) * sinThetaInv;
        const result = new Vec4();
        result.x = a.x * c0 + b.x * c1;
        result.y = a.y * c0 + b.y * c1;
        result.z = a.z * c0 + b.z * c1;
        result.w = a.w * c0 + b.w * c1;
        if (isNaN(result.x)) {
            console.log("a", a, "b", b, "t", t, "dot", dot, "theta", theta, "sinTheta", sinTheta, "sinThetaInv", sinThetaInv, "c0", c0, "c1", c1, "result", result);
            throw new Error("result.x is NaN");
        }
        if (isNaN(result.y)) {
            console.log("a", a, "b", b, "t", t, "dot", dot, "theta", theta, "sinTheta", sinTheta, "sinThetaInv", sinThetaInv, "c0", c0, "c1", c1, "result", result);
            throw new Error("result.y is NaN");
        }
        if (isNaN(result.z)) {
            console.log("a", a, "b", b, "t", t, "dot", dot, "theta", theta, "sinTheta", sinTheta, "sinThetaInv", sinThetaInv, "c0", c0, "c1", c1, "result", result);
            throw new Error("result.z is NaN");
        }
        if (isNaN(result.w)) {
            console.log("a", a, "b", b, "t", t, "dot", dot, "theta", theta, "sinTheta", sinTheta, "sinThetaInv", sinThetaInv, "c0", c0, "c1", c1, "result", result);
            throw new Error("result.w is NaN");
        }
        return result;
    }
    getSamplerByIndex(index: number): GLTFAnimationSampler {
        const sampler = this.getAnimationData().getSamplers()[index];
        if (sampler === undefined) {
            throw new Error("sampler not found");
        }
        return sampler;

    }
}