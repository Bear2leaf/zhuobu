import SizeContainer from "../component/SizeContainer.js";
import Entity from "../entity/Entity.js";
import Matrix from "../math/Matrix.js";
import { Vec3 } from "../math/Vector.js";
import Camera from "./Camera.js";



export class OrthoCamera extends Camera {
    private readonly view: Matrix;
    private readonly projection: Matrix;

    constructor(entity: Entity) {
        
        super(entity);
        const left = 0;
        const right = entity.get(SizeContainer).getWidth();
        const bottom = entity.get(SizeContainer).getHeight();
        const top = 0;
        const near = 1;
        const far = -1;
        this.view = Matrix.lookAt(new Vec3(0, 0, 0), new Vec3(0, 0, -1), new Vec3(0, 1, 0)).inverse();
        this.projection = Matrix.ortho(left, right, bottom, top, near, far);

    }
    getView(): Matrix {
        return this.view;
    }
    getProjection(): Matrix {
        return this.projection;
    }

}
