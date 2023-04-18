import { device } from "../device/Device.js";
import GLTFMeshRenderer from "../renderer/MeshRenderer.js";
import Node from "../structure/Node.js";
import TRS from "../structure/TRS.js";

const accessorTypeToNumComponentsMap = {
    'SCALAR': 1,
    'VEC2': 2,
    'VEC3': 3,
    'VEC4': 4,
    'MAT2': 4,
    'MAT3': 9,
    'MAT4': 16,
};

type AccessorType = keyof typeof accessorTypeToNumComponentsMap;

function accessorTypeToNumComponents(type: AccessorType) {
    if (type in accessorTypeToNumComponentsMap) {
        return accessorTypeToNumComponentsMap[type];
    }
    throw new Error(`no key: ${type}`);
}

const glTypeToTypedArrayMap = {
    '5120': Int8Array,    // device.gl.BYTE
    '5121': Uint8Array,   // device.gl.UNSIGNED_BYTE
    '5122': Int16Array,   // device.gl.SHORT
    '5123': Uint16Array,  // device.gl.UNSIGNED_SHORT
    '5124': Int32Array,   // device.gl.INT
    '5125': Uint32Array,  // device.gl.UNSIGNED_INT
    '5126': Float32Array, // device.gl.FLOAT
};

type GLType = keyof typeof glTypeToTypedArrayMap;

// Given a GL type return the TypedArray needed
function glTypeToTypedArray(type: GLType) {
    if (type in glTypeToTypedArrayMap) {
        return glTypeToTypedArrayMap[type];
    }
    throw new Error(`no key: ${type}`);
}

type GLTFNode = {
    children: number[],
    mesh: number,
    name: string,
    rotation: number[],
    scale: number[],
    translation: number[],
    trs: TRS,
    parent: Node,
    skin: number,

}
type GLTFMeshPrimitive = {
    attributes: {
        [key: string]: number,
    },
    indices?: number,
    material: number,
}
type Primitive = {
    bufferInfo: BufferInfo,
    material: {
        
    },
    indices: number,
}
type GLTFBuffer = {
    byteLength: number,
    uri: string,
}
type BufferInfo = {
    attribs: {
        [key: string]: {
            buffer: WebGLBuffer | null,
            type: GLType,
            numComponents: number,
            stride: number,
            offset: number,
        },
    },
    numElements: number,
    indices?: WebGLBuffer | null,
    elementType?: GLType,

}
export type GLTFMesh = {
    primitives: (GLTFMeshPrimitive| Primitive)[],
}
type GLTF = {
    nodes: (GLTFNode | Node)[],
    meshes: GLTFMesh[],
    accessors: {
        bufferView: number,
        byteOffset?: number,
        componentType: GLType,
        count: number,
        type: AccessorType,
    }[],
    bufferViews: {
        buffer: number,
        byteOffset: number,
        byteLength: number,
        byteStride: number,
        target?: number,
        webglBuffer: WebGLBuffer | null,
    }[],
    buffers: (GLTFBuffer | ArrayBuffer)[],
    materials: {
        name?: string,
        pbrMetallicRoughness: {
            baseColorFactor?: number[],
            baseColorTexture?: {
                index: number,
            },
            metallicFactor?: number,
            roughnessFactor?: number,
            metallicRoughnessTexture?: {
                index: number,
            },
        },
        normalTexture?: {
            index: number,
        },
        occlusionTexture?: {
            index: number,
        },
        emissiveTexture?: {

            index: number,
        },
        emissiveFactor?: number[],
        alphaMode?: string,
        alphaCutoff?: number,
        doubleSided?: boolean,
    }[],
    images: {
        uri: string,
    }[],
    samplers: {
        magFilter?: number,
        minFilter?: number,
        wrapS?: number,
        wrapT?: number,
    }[],
    textures: {
        sampler?: number,
        source?: number,
    }[],
    animations: {
        channels: {
            sampler: number,
            target: {
                node: number,
                path: string,
            },
        }[],
        samplers: {
            input: number,
            interpolation?: string,
            output: number,
        }[],
    }[],
    scene: number,
    scenes: {
        nodes: number[],
        name: string,
    }[],
};


// Given an accessor index return a WebGLBuffer and a stride
function getAccessorAndWebGLBuffer(gltf: GLTF, accessorIndex: number) {
    const accessor = gltf.accessors[accessorIndex];
    const bufferView = gltf.bufferViews[accessor.bufferView];
    if (!bufferView.webglBuffer) {
        const buffer = device.gl.createBuffer();
        const target = bufferView.target || device.gl.ARRAY_BUFFER;
        const arrayBuffer = gltf.buffers[bufferView.buffer] as ArrayBuffer;
        const data = new Uint8Array(arrayBuffer, bufferView.byteOffset, bufferView.byteLength);
        device.gl.bindBuffer(target, buffer);
        device.gl.bufferData(target, data, device.gl.STATIC_DRAW);
        bufferView.webglBuffer = buffer;
    }
    return {
        accessor,
        buffer: bufferView.webglBuffer,
        stride: bufferView.byteStride || 0,
    };
}

export async function loadGLTF(url: string) {
    const gltf: GLTF = await loadJSON(url);

    // load all the referenced files relative to the gltf file
    const baseURL = new URL(url, location.href);
    gltf.buffers = await Promise.all(gltf.buffers.map((buffer) => {
        const url = new URL((buffer as {
            uri: string,
        }).uri, baseURL.href);
        return loadBinary(url.href);
    }));

    const defaultMaterial = {
        uniforms: {
            u_diffuse: [.5, .8, 1, 1],
        },
    };

    function entries(obj: { [key: string]: number }) {
        return Object.keys(obj).map<([string, number])>((key) => [key, obj[key]]);
    }

    // setup meshes
    gltf.meshes.forEach((mesh) => {
        mesh.primitives.forEach((primitive) => {
            const attribs: {
                [key: string]: {
                    buffer: WebGLBuffer | null,
                    type: GLType,
                    numComponents: number,
                    stride: number,
                    offset: number,
                },

            } = {};
            let numElements = 0;
            const gltfPrimitive = primitive as GLTFMeshPrimitive
            for (const [attribName, index] of entries((gltfPrimitive).attributes)) {
                const { accessor, buffer, stride } = getAccessorAndWebGLBuffer(gltf, index);
                numElements = accessor.count;
                attribs[`a_${attribName}`] = {
                    buffer,
                    type: accessor.componentType,
                    numComponents: accessorTypeToNumComponents(accessor.type),
                    stride,
                    offset: accessor.byteOffset || 0,
                };
            }

            const bufferInfo: BufferInfo = {
                attribs,
                numElements,
            };
            const glPrimitive = primitive as Primitive

            if (glPrimitive.indices !== undefined) {
                const { accessor, buffer } = getAccessorAndWebGLBuffer(gltf, glPrimitive.indices);
                bufferInfo.numElements = accessor.count;
                bufferInfo.indices = buffer;
                bufferInfo.elementType = accessor.componentType;
            }

            glPrimitive.bufferInfo = bufferInfo;

            // make a VAO for this primitive
            // glPrimitive.vao = twgl.createVAOFromBufferInfo(meshProgramInfo, glPrimitive.bufferInfo);

            // save the material info for this primitive
            glPrimitive.material = gltf.materials && gltf.materials[gltfPrimitive.material] || defaultMaterial;
        });
    });

    const origNodes = gltf.nodes;
    gltf.nodes = (gltf.nodes as GLTFNode[]).map<Node>((n) => {
        const { name, skin, mesh, translation, rotation, scale } = n;
        const trs = new TRS(translation, rotation, scale);
        const node = new Node(trs, name);
        const realMesh = gltf.meshes[mesh];
        if (realMesh) {
            node.drawables.push(new GLTFMeshRenderer(realMesh));
        }
        return node;
    });
    const nodes = gltf.nodes as Node[];

    // arrange nodes into graph
    (nodes).forEach((node, ndx) => {
        const children = origNodes[ndx].children as number[];
        if (children) {
            addChildren(nodes, node, children);
        }
    });

    // setup scenes
    for (const scene of gltf.scenes) {
        addChildren(nodes, new Node(new TRS(), scene.name), scene.nodes);
    }

    return gltf;
}

function addChildren(nodes: Node[], node: Node, childIndices: number[]) {
    childIndices.forEach((childNdx) => {
        const child = nodes[childNdx];
        child.setParent(node);
    });
}

async function loadFile(url: string, typeFunc: 'arrayBuffer' | 'json') {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`could not load: ${url}`);
    }
    return await response[typeFunc]();
}

async function loadBinary(url: string) {
    return loadFile(url, 'arrayBuffer');
}

async function loadJSON(url: string) {
    return loadFile(url, 'json');
}