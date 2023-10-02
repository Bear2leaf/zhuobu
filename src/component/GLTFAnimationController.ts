import SkinMesh from "../drawobject/SkinMesh.js";
import Matrix from "../geometry/Matrix.js";
import { Vec3, Vec4 } from "../geometry/Vector.js";
import GLTFAnimation from "../gltf/GLTFAnimation.js";
import GLTFAnimationSampler from "../gltf/GLTFAnimationSampler.js";
import Component from "./Component.js";


export default class GLTFAnimationController extends Component {
    private animationData?: GLTFAnimation;
    init(): void {
    }
    setAnimationData(animationData: GLTFAnimation): void {
        this.animationData = animationData;
    }
    getAnimationData(): GLTFAnimation {
        if (this.animationData === undefined) {
            throw new Error("animationData is undefined");
        }
        return this.animationData;
    }
    animate(time: number): void {
        // this.animSkin(Math.sin(time) * 0.5);
        this.animSkinGLTF(time);

    }
    animSkinGLTF(time: number) {

        const channels = this.getAnimationData().getChannels();
        channels.forEach((channel) => {
            const sampler = this.getSamplerByIndex(channel.getSampler());
            const target = channel.getTarget();
            const joint = target.getAnimationNode();
            const path = target.getPath();
            const inputBuffer = sampler.getInputBuffer();
            const outputBuffer = sampler.getOutputBuffer();
            const localTime = (time) % inputBuffer[inputBuffer.length - 1];
            // find the nearest index
            const bufferIndex = sampler.getNearestIndexFromTime(localTime);
            // get the value from the output buffer
            const previousTime = inputBuffer[bufferIndex];
            const nextTime = inputBuffer[bufferIndex + 1];
            const interpolationValue = (localTime - previousTime) / (nextTime - previousTime);
            // if there is no matrix saved for this joint
            const jointSource = joint.getSource();
            if (!jointSource) {
                throw new Error("jointSource is undefined");
            }
            if (path === "translation") {
                const currentBuffer = [...outputBuffer.slice(bufferIndex * 3, bufferIndex * 3 + 6)]
                const previousTranslation = new Vec3(...currentBuffer.slice(0, 3));
                const nextTranslation = new Vec3(...currentBuffer.slice(3, 6));
                const currentTranslation = nextTranslation.subtract(previousTranslation).multiply(interpolationValue).add(previousTranslation);
                jointSource.getPosition().from(currentTranslation);
            } else if (path === "rotation") {
                const currentBuffer = [...outputBuffer.slice(bufferIndex * 4, bufferIndex * 4 + 8)]
                const previousRotation = new Vec4(...currentBuffer.slice(0, 4));
                const nextRotation = new Vec4(...currentBuffer.slice(4, 8));
                const currentRotation = this.slerp(previousRotation, nextRotation, interpolationValue);
                jointSource.getRotation().from(currentRotation);
            } else {
                throw new Error("path not found");
            }
        });
    }
    slerp(a: Vec4, b: Vec4, t: number): Vec4 {
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