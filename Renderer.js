import { Point, PointCollection, Tetrahedron } from "./Geometry.js";
import { gl } from "./global.js";
import { PointShader, TriangleShader } from "./Shader.js";
import { flatten } from "./Vector.js";
export default class Renderer {
    constructor(shader, mode) {
        this.mode = mode;
        this.vertices = [];
        this.colors = [];
        this.shader = shader;
        this.vbo = gl.createBuffer();
        this.vao = gl.createVertexArray();
    }
    setVertices(vertices) {
        vertices.forEach(vec => {
            vec.w = 1;
            this.vertices.push(vec);
        });
    }
    setColors(colors) {
        this.colors.push(...colors);
    }
    render() {
        this.shader.useAndGetProgram();
        gl.bindVertexArray(this.vao);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(1);
        gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 0, this.vertices.length * 4 * 4);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bufferData(gl.ARRAY_BUFFER, flatten([...this.vertices, ...this.colors]), gl.STATIC_DRAW);
        gl.drawArrays(this.mode, 0, this.vertices.length);
    }
}
export class TriangleRenderer extends Renderer {
    constructor() {
        super(new TriangleShader(), gl.TRIANGLES);
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
        const recursiveLevel = 2;
        divideRecursiveTetrahedron(new Tetrahedron(new Point(0, 0, -1.0), new Point(0.0, 1.0, 1.0), new Point(1.0, -1.0, 1.0), new Point(-1.0, -1.0, 1.0)), recursiveLevel);
        this.setVertices(points.vertices);
        this.setColors(colors.vertices);
        super.render();
    }
}
export class PointRenderer extends Renderer {
    constructor() {
        super(new PointShader(), gl.POINTS);
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
        divideRecursiveTetrahedron(new Tetrahedron(new Point(0, 0, -1.0), new Point(0.0, 1.0, 1.0), new Point(1.0, -1.0, 1.0), new Point(-1.0, -1.0, 1.0)), recursiveLevel);
        this.setVertices(points.vertices);
        this.setColors(colors.vertices);
        super.render();
    }
}
//# sourceMappingURL=Renderer.js.map