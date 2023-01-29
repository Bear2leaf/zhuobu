import Camera from "../Camera.js";
import { device } from "../Device.js";
import Matrix from "../Matrix.js";
import { Vec4 } from "../Vector.js";
import DrawObject from "./DrawObject.js";

const windowInfo = device.getWindowInfo();
export default class CameraCube extends DrawObject {
    readonly camera: Camera;
    constructor(camera: Camera) {
        super();
        this.camera = camera;
        const positions = [
            new Vec4(-1, -1, -1, 1),  // cube vertices
            new Vec4( 1, -1, -1, 1),
            new Vec4(-1,  1, -1, 1),
            new Vec4( 1,  1, -1, 1),
            new Vec4(-1, -1,  1, 1),
            new Vec4( 1, -1,  1, 1),
            new Vec4(-1,  1,  1, 1),
            new Vec4( 1,  1,  1, 1),
        ];
        const indices = [
            0, 1, 1, 3, 3, 2, 2, 0, // cube indices
            4, 5, 5, 7, 7, 6, 6, 4,
            0, 4, 1, 5, 3, 7, 2, 6,
        ];
        this.setVertices(positions)
        this.setIndices(indices)
    }
    update(): void {
        
        this.setWorldMatrix(this.camera.projection.inverse().multiply(this.camera.view.inverse()))

    }
}