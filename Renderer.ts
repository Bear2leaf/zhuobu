import { LineSegment, Point, PointCollection, Tetrahedron, Triangle } from "./Geometry.js";
import { gl } from "./global.js";
import Shader, { PointShader, TriangleShader } from "./Shader.js";
import { Vec4, flatten } from "./Vector.js";


export default class Renderer {
    private readonly vertices: Vec4[];
    private readonly colors: Vec4[];
    private readonly mode: number;
    private readonly vbo: WebGLBuffer | null;
    private readonly vao: WebGLVertexArrayObject | null;
    private readonly shader: Shader;
    constructor(shader: Shader, mode: number) {
        this.mode = mode;
        this.vertices = [];
        this.colors = [];
        this.shader = shader;
        this.vbo = gl.createBuffer();
        this.vao = gl.createVertexArray();
    }
    setVertices(vertices: Vec4[]) {
        vertices.forEach(vec => {
            vec.w = 1;
            this.vertices.push(vec);
        });
    }
    setColors(colors: Vec4[]) {
        this.colors.push(...colors);
    }
    render() {
        this.shader.useAndGetProgram();
        gl.bindVertexArray(this.vao);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo)
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(1);
        gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 0, this.vertices.length * 4 * 4);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bufferData(gl.ARRAY_BUFFER, flatten([...this.vertices, ...this.colors]), gl.STATIC_DRAW);
        gl.drawArrays(this.mode, 0, this.vertices.length)
    }
}
export class TriangleRenderer extends Renderer {
    constructor() {
        super(new TriangleShader(), gl.TRIANGLES)
    }
    render(): void {
        const points = new PointCollection()
        const colors = new PointCollection();
        function divideRecursiveTetrahedron(tetrahedron: Tetrahedron, level: number) {
            if (!level) {
                tetrahedron.triangles.forEach(triangle => {
                    points.add(triangle.points[0])
                    points.add(triangle.points[1])
                    points.add(triangle.points[2])
                })
                tetrahedron.colorTriangles.forEach(triangle => {
                    colors.add(triangle.points[0])
                    colors.add(triangle.points[1])
                    colors.add(triangle.points[2])
                })
            } else {
                level--;
                tetrahedron.divide().forEach(function (o) {
                    divideRecursiveTetrahedron(o, level);
                })
            }
        }
        const recursiveLevel = 2;
        divideRecursiveTetrahedron(new Tetrahedron(
            new Point(0, 0, -1.0)
            , new Point(0.0, 1.0, 1.0)
            , new Point(1.0, -1.0, 1.0)
            , new Point(-1.0, -1.0, 1.0)
        ), recursiveLevel);
        this.setVertices(points.vertices);
        this.setColors(colors.vertices);
        
        super.render()
    }
}
export class PointRenderer extends Renderer {
    constructor() {
        super(new PointShader(), gl.POINTS)
    }
    render(): void {
        const points = new PointCollection()
        const colors = new PointCollection();
        function divideRecursiveTetrahedron(tetrahedron: Tetrahedron, level: number) {
            if (!level) {
                tetrahedron.triangles.forEach(triangle => {
                    points.add(triangle.points[0])
                    points.add(triangle.points[1])
                    points.add(triangle.points[2])
                })
                tetrahedron.colorTriangles.forEach(triangle => {
                    colors.add(triangle.points[0])
                    colors.add(triangle.points[1])
                    colors.add(triangle.points[2])
                })
            } else {
                level--;
                tetrahedron.divide().forEach(function (o) {
                    divideRecursiveTetrahedron(o, level);
                })
            }
        }
        const recursiveLevel = 5;
        divideRecursiveTetrahedron(new Tetrahedron(
            new Point(0, 0, -1.0)
            , new Point(0.0, 1.0, 1.0)
            , new Point(1.0, -1.0, 1.0)
            , new Point(-1.0, -1.0, 1.0)
        ), recursiveLevel);
        this.setVertices(points.vertices);
        this.setColors(colors.vertices);
        
        super.render()
    }
}