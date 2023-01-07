import { OrthoCamera, PerspectiveCamera } from "./Camera.js";
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
        this.shader = shader;
        this.camera = camera;
        this.vbo = device.gl.createBuffer();
        this.vao = device.gl.createVertexArray();
        this.shader.setMatrix4fv("u_view", camera.matrix.getVertics());
        device.gl.bindVertexArray(this.vao);
        device.gl.bindBuffer(device.gl.ARRAY_BUFFER, this.vbo);
    }
    setVertices(vertices) {
        this.vertices.splice(0, this.vertices.length, ...vertices);
    }
    setColors(colors) {
        this.colors.splice(0, this.colors.length, ...colors);
    }
    updateTransform(matrix) {
        this.shader.setMatrix4fv("u_transform", matrix.getVertics());
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
        device.gl.drawArrays(this.mode, 0, this.vertices.length);
    }
}
export class TriangleRenderer extends Renderer {
    constructor() {
        super(new TriangleShader(), device.gl.TRIANGLES, new PerspectiveCamera());
        this.frame = 0;
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
        const windowInfo = device.getWindowInfo();
        const left = -windowInfo.windowWidth / 2;
        const right = -left;
        const top = -windowInfo.windowHeight / 2;
        const bottom = -top;
        divideRecursiveTetrahedron(new Tetrahedron(new Point(0, 0, left), new Point(0, bottom, left * 2), new Point(right, top, left * 2), new Point(left, top, left * 2)), recursiveLevel);
        const ctm = Matrix.identity()
            .translate(new Vec4(0, 0, left * 2, 0))
            .rotateY(Math.PI / 360 * this.frame++)
            .multiply(Matrix.identity().translate(new Vec4(0, 0, left * 2, 0)).inverse());
        this.updateTransform(ctm);
        this.setVertices(points.vertices);
        this.setColors(colors.vertices);
        super.render();
    }
}
export class PointRenderer extends Renderer {
    constructor() {
        super(new PointShader(), device.gl.POINTS, new OrthoCamera());
    }
    render() {
        super.render();
    }
}
//# sourceMappingURL=Renderer.js.map