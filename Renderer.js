import { PerspectiveCamera } from "./Camera.js";
import { device } from "./Device.js";
import { PointCollection, Tetrahedron, Point } from "./Geometry.js";
import Matrix from "./Matrix.js";
import { PointShader, TriangleShader } from "./Shader.js";
import { Vec4, flatten } from "./Vector.js";
export default class Renderer {
    constructor(shader, mode, camera) {
        this.mode = mode;
        this.vertices = [];
        this.colors = [];
        this.indices = [];
        this.shader = shader;
        this.ebo = device.gl.createBuffer();
        this.vbo = device.gl.createBuffer();
        this.vao = device.gl.createVertexArray();
        this.shader.setMatrix4fv("u_view", camera.view.getVertics());
        this.shader.setMatrix4fv("u_projection", camera.projection.getVertics());
        device.gl.bindVertexArray(this.vao);
        device.gl.bindBuffer(device.gl.ARRAY_BUFFER, this.vbo);
        device.gl.bindBuffer(device.gl.ELEMENT_ARRAY_BUFFER, this.ebo);
    }
    setVertices(vertices) {
        this.vertices.splice(0, this.vertices.length, ...vertices);
    }
    setIndices(indices) {
        this.indices.splice(0, this.indices.length, ...indices);
    }
    setColors(colors) {
        this.colors.splice(0, this.colors.length, ...colors);
    }
    updateTransform(matrix) {
        this.shader.setMatrix4fv("u_world", matrix.getVertics());
    }
    setTextureUnit() {
        this.shader.setInteger("u_texture", 0);
    }
    render() {
        this.shader.use();
        device.gl.bindBuffer(device.gl.ARRAY_BUFFER, this.vbo);
        device.gl.enableVertexAttribArray(0);
        device.gl.vertexAttribPointer(0, 4, device.gl.FLOAT, false, 0, 0);
        device.gl.enableVertexAttribArray(1);
        device.gl.vertexAttribPointer(1, 4, device.gl.FLOAT, false, 0, this.vertices.length * 4 * 4);
        device.gl.bufferData(device.gl.ARRAY_BUFFER, flatten([...this.vertices, ...this.colors]), device.gl.STATIC_DRAW);
        device.gl.bindBuffer(device.gl.ELEMENT_ARRAY_BUFFER, this.ebo);
        device.gl.bufferData(device.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), device.gl.STATIC_DRAW);
        device.gl.drawElements(this.mode, this.indices.length, device.gl.UNSIGNED_SHORT, 0);
    }
}
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
            .translate(new Vec4(0, 0, -8, 0))
            .rotateY(Math.PI / 180 * this.frame++);
        this.updateTransform(ctm);
        this.setVertices(points.vertices);
        this.setColors(colors.vertices);
        this.setIndices(new Array(points.vertices.length).fill(0).map((_, index) => index));
        super.render();
    }
}
export class PointRenderer extends Renderer {
    constructor(camera) {
        super(new PointShader(), device.gl.POINTS, camera);
    }
    render() {
        super.render();
    }
}
//# sourceMappingURL=Renderer.js.map