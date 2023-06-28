import Component from "../component/Component.js";
import Entity from "../entity/Entity.js";
import Matrix from "../math/Matrix.js";

export default abstract class Camera implements Component {

    constructor(private readonly entity: Entity) {
        
    }
    abstract getView(): Matrix;
    abstract getProjection(): Matrix;
}


