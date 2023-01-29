import { PerspectiveCamera } from "../Camera.js";
import { device } from "../Device.js";
import { PointCollection, Tetrahedron, Point } from "../Geometry.js";
import Matrix from "../Matrix.js";
import Renderer from "./Renderer.js";
import { TriangleShader } from "../Shader.js";
import { Vec4 } from "../Vector.js";
export class TriangleRenderer extends Renderer {
    constructor() {
        super(new TriangleShader(), device.gl.TRIANGLES, new PerspectiveCamera());
        this.frame = 0;
        console.log(this);
    }
    render() {
        const points = new PointCollection();
        const colors = new PointCollection();
        function divideRecursiveTetrahedron(tetrahedron, level) {
            if (!level) {
                tetrahedron.triangles.forEach(triangle => {
                    points.add(triangle.points[0]);
                    points.add(triangle.points[1]);
                    points.add(triangle.points[2]);
                });
                tetrahedron.colorTriangles.forEach(triangle => {
                    colors.add(triangle.points[0]);
                    colors.add(triangle.points[1]);
                    colors.add(triangle.points[2]);
                });
            }
            else {
                level--;
                tetrahedron.divide().forEach(function (o) {
                    divideRecursiveTetrahedron(o, level);
                });
            }
        }
        const recursiveLevel = 5;
        divideRecursiveTetrahedron(new Tetrahedron(new Point(0, 0, 1), new Point(0, 1, -1), new Point(1, -1, -1), new Point(-1, -1, -1)), recursiveLevel);
        const ctm = Matrix.identity()
            .translate(new Vec4(0, 0, -8, 0));
        this.updateTransform(ctm);
        this.setVertices(points.vertices);
        this.setColors(colors.vertices);
        this.setIndices(new Array(points.vertices.length).fill(0).map((_, index) => index));
        super.render();
    }
}
//# sourceMappingURL=TriangleRenderer%20copy.js.map