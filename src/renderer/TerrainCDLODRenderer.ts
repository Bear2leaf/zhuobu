
import TerrainCDLOD from "../drawobject/TerrainCDLOD.js";
import Renderer from "./Renderer.js";

export default class TerrainCDLODRenderer extends Renderer {
    render() {
        this.getShader().use();
        this.prepareLight();
        const objects = this.getObjectList() as TerrainCDLOD[];
        objects.forEach(object => {
            object.drawByRenderer(this)
        })
    }
}