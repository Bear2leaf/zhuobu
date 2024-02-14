
import TerrainCDLOD from "../drawobject/TerrainCDLOD.js";
import { Tuple } from "../map/util.js";
import Renderer from "./Renderer.js";

export default class TerrainCDLODRenderer extends Renderer {
    updateLookAt(renderer: TerrainCDLODRenderer, eye: Tuple<number, 3>, target: Tuple<number, 3>, up: Tuple<number, 3>) {
        renderer.getShader().updateUniform("u_up", up);
        renderer.getShader().updateUniform("u_eye", eye);
        renderer.getShader().updateUniform("u_target", target);
    }
    updatePerspective(renderer: TerrainCDLODRenderer, fov: number, aspect: number, near: number, far: number) {
        renderer.getShader().updateUniform("u_perspective", [fov, aspect, near, far]);
    }
    render() {
        const renderer = this;
        this.getShader().use();
        this.prepareLight();
        const objects = this.getObjectList() as TerrainCDLOD[];
        objects.forEach(object => {
            const perspective: Tuple<number, 4> = [Math.PI / 4, 1, 0.01, 100];
            const up: Tuple<number, 3> = [0, 1, 0];
            const target: Tuple<number, 3> = [0, 0, 0];
            const eye: Tuple<number, 3> = [1, 0, 1];
            this.updatePerspective(renderer, ...perspective);
            this.updateLookAt(renderer, eye, target, up);
            renderer.getShader().updateUniform("u_resolution", object.TILE_RESOLUTION);
            renderer.getShader().updateUniform("u_lightDirection", [1, 1, 0]);
            object.getTexture().active();
            object.getTexture().bind();
            renderer.getShader().updateUniform("u_texture", object.getTexture().getBindIndex());
            object.getDepthTexture().active();
            object.getDepthTexture().bind();
            renderer.getShader().updateUniform("u_texture7", object.getDepthTexture().getBindIndex());
            const model: Tuple<number, 16> = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1,
            ];
            renderer.getShader().updateUniform("u_model", model);
            object.bind();
            for (let i = 0; i < object.tiles; i++) {
                const scale = object.scales[i];
                const offset = object.offsets[i];
                const edge = object.edges[i];
                renderer.getShader().updateUniform("u_scale", scale);
                renderer.getShader().updateUniform("u_offset", offset);
                renderer.getShader().updateUniform("u_edge", edge);
                object.draw()
    
                // context.drawArrays(context.LINES, 0, this.TILE_RESOLUTION * this.TILE_RESOLUTION * 6);
            }
        })
        objects.splice(0, objects.length);

    }
}