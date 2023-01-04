import { device } from "./Device.js";
import { PointCollection, Tetrahedron, Point } from "./Geometry.js";
import { PointShader, TriangleShader } from "./Shader.js";
import { flatten } from "./Vector.js";
export default class Renderer {
    constructor(shader, mode) {
        this.mode = mode;
        this.vertices = [];
        this.colors = [];
        this.shader = shader;
        this.vbo = device.gl.createBuffer();
        this.vao = device.gl.createVertexArray();
        this.shader.useAndGetProgram();
        device.gl.bindVertexArray(this.vao);
        device.gl.bindBuffer(device.gl.ARRAY_BUFFER, this.vbo);
    }
    setVertices(vertices) {
        this.vertices.splice(0, this.vertices.length, ...vertices);
    }
    setColors(colors) {
        this.colors.splice(0, this.colors.length, ...colors);
    }
    render() {
        this.shader.useAndGetProgram();
        device.gl.bindBuffer(device.gl.ARRAY_BUFFER, this.vbo);
        device.gl.enableVertexAttribArray(0);
        device.gl.vertexAttribPointer(0, 4, device.gl.FLOAT, false, 0, 0);
        device.gl.enableVertexAttribArray(1);
        device.gl.vertexAttribPointer(1, 4, device.gl.FLOAT, false, 0, this.vertices.length * 4 * 4);
        device.gl.bufferData(device.gl.ARRAY_BUFFER, flatten([...this.vertices, ...this.colors]), device.gl.STATIC_DRAW);
        device.gl.drawArrays(this.mode, 0, this.vertices.length);
    }
}
export class TriangleRenderer extends Renderer {
    constructor() {
        super(new TriangleShader(), device.gl.TRIANGLES);
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
        const recursiveLevel = 1;
        divideRecursiveTetrahedron(new Tetrahedron(new Point(0, 0, -1.0), new Point(0.0, 1.0, 1.0), new Point(1.0, -1.0, 1.0), new Point(-1.0, -1.0, 1.0)), recursiveLevel);
        this.setVertices(points.vertices);
        this.setColors(colors.vertices);
        super.render();
    }
}
export class PointRenderer extends Renderer {
    constructor() {
        super(new PointShader(), device.gl.POINTS);
    }
    render() {
        super.render();
    }
}
//# sourceMappingURL=Renderer.js.map