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
        this.animSkin(Math.sin(time / 10) * 0.5);
        // const channels = this.getAnimationData().getChannels();
        // channels.forEach((channel) => {
        //     const sampler = this.getSamplerByIndex(channel.getSampler());
        //     const target = channel.getTarget();
        //     const node = target.getAnimationNode();
        //     const path = target.getPath();
        //     const inputBuffer = sampler.getInputBuffer();
        //     const outputBuffer = sampler.getOutputBuffer();
        //     const localTime = time % inputBuffer[inputBuffer.length - 1];
        //     // find the nearest index
        //     const bufferIndex = sampler.getNearestIndexFromTime(localTime);
        //     // get the value from the output buffer
        //     const previousTime = inputBuffer[bufferIndex];
        //     const nextTime = inputBuffer[bufferIndex + 1];
        //     const interpolationValue = (localTime - previousTime) / (nextTime - previousTime);
        //     const jonintNodes = this.getEntity().get(SkinMesh).getJointNodes();
        //     const origMatrices = this.getEntity().get(SkinMesh).getOrigMatrices();
        //     for (let i = 0; i < jonintNodes.length; ++i) {
        //         const joint = jonintNodes[i];
        //         if (node !== joint) {
        //             continue;
        //         }
        //         // if there is no matrix saved for this joint
        //         const jointSource = joint.getSource();
        //         if (!jointSource) {
        //             throw new Error("jointSource is undefined");
        //         }
        //         if (!origMatrices.has(joint)) {
        //             // save a matrix for joint
        //             origMatrices.set(joint, jointSource.getMatrix());
        //         }
        //         // get the original matrix
        //         const origMatrix = origMatrices.get(joint);
        //         if (!origMatrix) {
        //             throw new Error("origMatrix is undefined");
        //         }
        //         const m = Matrix.identity()
        //         const bufferIndex = sampler.getNearestIndexFromTime(time);
        //         if (path === "translation") {
        //             const previousTranslation = new Vec3(...outputBuffer.slice(bufferIndex * 3, bufferIndex * 3 + 3));
        //             const nextTranslation = new Vec3(...outputBuffer.slice(bufferIndex * 3 + 3, bufferIndex * 3 + 6));
        //             const currentTranslation = previousTranslation.add(nextTranslation.subtract(previousTranslation).multiply(interpolationValue))
        //             m.translate(new Vec4(1, 1, 1, 0));
        //         } else if (path === "rotation") {
        //             // m.multiply(origMatrix).rotateX(Math.sin(time / 10) * 0.5);
        //         }
        //         // decompose it back into position, rotation, scale
        //         // into the joint
        //         Matrix.decompose(m, jointSource.getPosition(), jointSource.getRotation(), jointSource.getScale());
        //     }
        // });

    }
    getSamplerByIndex(index: number): GLTFAnimationSampler {
        const sampler = this.getAnimationData().getSamplers()[index];
        if (sampler === undefined) {
            throw new Error("sampler not found");
        }
        return sampler;

    }
    animSkin(a: number) {
        const jonintNodes = this.getEntity().get(SkinMesh).getJointNodes();
        const origMatrices = this.getEntity().get(SkinMesh).getOrigMatrices();
        for (let i = 0; i < jonintNodes.length; ++i) {
            const joint = jonintNodes[i];
            // if there is no matrix saved for this joint
            const jointSource = joint.getSource();
            if (!jointSource) {
                throw new Error("jointSource is undefined");
            }
            if (!origMatrices.has(joint)) {
                // save a matrix for joint
                origMatrices.set(joint, jointSource.getMatrix());
            }
            // get the original matrix
            const origMatrix = origMatrices.get(joint);
            if (!origMatrix) {
                throw new Error("origMatrix is undefined");
            }
            // rotate it
            const m = Matrix.identity().multiply(origMatrix).rotateX(a).translate(new Vec4(1, a, 1, 0));
            // decompose it back into position, rotation, scale
            // into the joint
            Matrix.decompose(m, jointSource.getPosition(), jointSource.getRotation(), jointSource.getScale());
        }
    }

}