import { LineSegment, Point, PointCollection, Triangle } from "./Geometry.js";
import { gl } from "./global.js";
import Shader, { DemoRedShader as RedPointShader, DemoShader as TriangleShader } from "./Shader.js";
import { Vec4, flatten } from "./Vector.js";


export default class Renderer {
    private readonly vertices: Vec4[];
    private readonly mode: number;
    private readonly vao: WebGLVertexArrayObject | null;
    private readonly vbo: WebGLBuffer | null;
    private readonly shader: Shader;
    constructor(shader: Shader, mode: number) {
        this.mode = mode;
        this.vertices = [];
        this.shader = shader;
        this.vao = gl.createVertexArray();
        this.vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bindVertexArray(this.vao);
    }
    setVertices(vertices: Vec4[]) {
        vertices.forEach(vec => {
            vec.w = 1;
            this.vertices.push(vec);
        });
    }
    render() {
        this.shader.useAndGetProgram();
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(this.vertices), gl.STATIC_DRAW);
        gl.drawArrays(this.mode, 0, this.vertices.length)
    }
}
export class TriangleRenderer extends Renderer {
    constructor() {
        super(new TriangleShader(), gl.TRIANGLES)
    }
    render(): void {
        const points = new PointCollection()
        function divideRecursive(triangle: Triangle, count: number) {
            if (!count) {
                points.add(triangle.points[0])
                points.add(triangle.points[1])
                points.add(triangle.points[2])
            } else {
                count--;
                triangle.divide().forEach(function (o) {
                    divideRecursive(o, count);
                })
            }
        }
        const recursiveLevel = 5;
        divideRecursive(new Triangle(
            new Point(-1.0, -1.0),
            new Point(0.0, 1.0),
            new Point(1.0, -1.0)), recursiveLevel);
        this.setVertices(points.vertices);
        super.render()
    }
}
export class PointRenderer extends Renderer {
    constructor() {
        super(new RedPointShader(), gl.POINTS)
    }
    render(): void {
        const numPositions = 5000;
        const triangle = new Triangle(
            new Point(-0.5, -0.5),
            new Point(0.0, 0.5),
            new Point(0.5, -0.5),);
        this.setVertices(triangle.vertices);
        super.render()
    }
}