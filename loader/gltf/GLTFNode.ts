import DrawObject from "../../drawobject/DrawObject.js";
import Mesh from "../../drawobject/Mesh.js";
import Node from "../../structure/Node.js";
import TRS from "../../structure/TRS.js";
import GLTF from "./GLTF.js";

export default class GLTFNode {
    private readonly name: string;
    private readonly mesh?: number;
    private readonly children?: number[];
    private readonly translation?: number[];
    private readonly rotation?: number[];
    private readonly scale?: number[];
    private readonly matrix?: number[];
    constructor(node: GLTFNode) {
        this.name = node.name;
        this.mesh = node.mesh;
        this.children = node.children;
        this.translation = node.translation;
        this.rotation = node.rotation;
        this.scale = node.scale;
        this.matrix = node.matrix;
    }
    getChildrenNodes(gltf: GLTF) {
        if (this.children === undefined) {
            return []
        } else {
            return this.children.map((index) => gltf.getNodeByIndex(index));
        }
    }
    createDrawObject(gltf: GLTF, root?: Node): DrawObject[] {
        const node = new Node(new TRS(this.translation, this.rotation, this.scale), this.name);
        node.setParent(root);
        if (this.mesh === undefined) {
            return[];
        }
        const mesh = gltf.getMeshByIndex(this.mesh);
        return mesh.getPrimitives().reduce<DrawObject[]>((prev, primitive) => {
            const positionIndex = primitive.getAttributes().getPosition();
            const texcoordIndex = primitive.getAttributes().getTexCoord();
            const normalIndex = primitive.getAttributes().getNormal();
            const indicesIndex = primitive.getIndices();
            const drawObject = new Mesh(gltf.getDataByAccessorIndex(positionIndex) as Float32Array, gltf.getDataByAccessorIndex(normalIndex) as Float32Array, gltf.getDataByAccessorIndex(indicesIndex) as Uint16Array, node);
            prev.push(drawObject);
            return prev;
        }, []);
    }
    createAllDrawObjects(gltf: GLTF): DrawObject[] {
        const root = new Node(new TRS(this.translation, this.rotation, this.scale), this.name);
        const drawObjects: DrawObject[] = [];
        drawObjects.push(...this.createDrawObject(gltf));
        this.getChildrenNodes(gltf).forEach((node) => {
            drawObjects.push(...node.createDrawObject(gltf));
        });
        return drawObjects;
    }
}