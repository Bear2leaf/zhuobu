import { flatten, Vec4 } from "../geometry/Vector.js";
import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import HorizontalQuad from "../geometry/HorizontalQuad.js";
import TRS from "../transform/TRS.js";
import Node from "../transform/Node.js";

export default class Terrian extends DrawObject {
    private readonly tileNumber = 10;
    private readonly tileSize = 1;
    private readonly startHeight = -2;
    private readonly height = 2;
    init() {

        super.init();
        const vertices: Vec4[] = []
        const colors: Vec4[] = []
        const indices: number[] = []
        const texcoords: Vec4[] = []
        const normals: Vec4[] = []
        const heightMapData = new Array(this.tileNumber).fill(0).map(() => new Array(this.tileNumber).fill(0));
        heightMapData.forEach((row, i) => row.forEach((_, j) => heightMapData[i][j] = Math.random() * this.height + this.startHeight));
        for (let i = 0; i < this.tileNumber; i++) {
            for (let j = 0; j < this.tileNumber; j++) {
                const height0 = heightMapData[i][j];
                const height1 = heightMapData[i + 1]?.[j] || this.startHeight;
                const heigh2 = heightMapData[i + 1]?.[j + 1] || this.startHeight;
                const heigh3 = heightMapData[i]?.[j + 1] || this.startHeight;


                vertices.push(new Vec4(j * this.tileSize, height0, i * this.tileSize, 1));
                vertices.push(new Vec4(j * this.tileSize, height1, (i + 1) * this.tileSize, 1));
                vertices.push(new Vec4((j + 1) * this.tileSize, heigh2, (i + 1) * this.tileSize, 1));
                vertices.push(new Vec4((j + 1) * this.tileSize, heigh3, i * this.tileSize, 1));
                const normal0 = vertices[vertices.length - 4].clone().subtract(vertices[vertices.length - 3]).cross(vertices[vertices.length - 4].clone().subtract(vertices[vertices.length - 1])).normalize();
                const normal1 = vertices[vertices.length - 3].clone().subtract(vertices[vertices.length - 2]).cross(vertices[vertices.length - 3].clone().subtract(vertices[vertices.length - 4])).normalize();
                const normal2 = vertices[vertices.length - 2].clone().subtract(vertices[vertices.length - 1]).cross(vertices[vertices.length - 2].clone().subtract(vertices[vertices.length - 3])).normalize();
                const normal3 = vertices[vertices.length - 1].clone().subtract(vertices[vertices.length - 4]).cross(vertices[vertices.length - 1].clone().subtract(vertices[vertices.length - 2])).normalize();

                colors.push(new Vec4(1, 1, 1, 1));
                colors.push(new Vec4(1, 1, 1, 1));
                colors.push(new Vec4(1, 1, 1, 1));
                colors.push(new Vec4(1, 1, 1, 1));
                indices.push((i * this.tileNumber + j) * 4 + 0);
                indices.push((i * this.tileNumber + j) * 4 + 1);
                indices.push((i * this.tileNumber + j) * 4 + 2);
                indices.push((i * this.tileNumber + j) * 4 + 2);
                indices.push((i * this.tileNumber + j) * 4 + 3);
                indices.push((i * this.tileNumber + j) * 4 + 0);
                texcoords.push(new Vec4(0, 0, 0, 0));
                texcoords.push(new Vec4(0, 1, 0, 0));
                texcoords.push(new Vec4(1, 1, 0, 0));
                texcoords.push(new Vec4(1, 0, 0, 0));
                normals.push(normal0);
                normals.push(normal1);
                normals.push(normal2);
                normals.push(normal3);
            }
        }

        this.createABO(ArrayBufferIndex.Position, flatten(vertices), 4);
        this.createABO(ArrayBufferIndex.Color, flatten(colors), 4);
        this.createABO(ArrayBufferIndex.TextureCoord, flatten(texcoords), 4);
        this.createABO(ArrayBufferIndex.Normal, flatten(normals), 4);
        this.updateEBO(new Uint16Array(indices));
        this.getEntity().get(TRS).getPosition().x = -this.tileNumber * this.tileSize / 2;
        // this.getEntity().get(TRS).getPosition().y = -this.tileNumber * this.tileSize / 2;
        this.getEntity().get(TRS).getPosition().z = -this.tileNumber * this.tileSize / 2;
        // this.getEntity().get(TRS).getRotation().x = -Math.PI / 4;
        this.getEntity().get(Node).updateWorldMatrix();
    }
    draw(): void {
        this.getTexture().bind()
        this.getRenderingContext().switchBlend(true);
        this.getRenderingContext().switchRepeat(true);
        super.draw();
        this.getRenderingContext().switchRepeat(true);
        this.getRenderingContext().switchBlend(false);



    }
}