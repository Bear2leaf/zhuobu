var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ready, { device, gl } from "./global.js";
import * as twgl from "./twgl.js";
ready(main);
console.log(twgl);
"use strict";
const skinVS = `#version 300 es
in vec4 a_POSITION;
in vec3 a_NORMAL;
in vec4 a_WEIGHTS_0;
in uvec4 a_JOINTS_0;

uniform mat4 u_projection;
uniform mat4 u_view;
uniform mat4 u_world;
uniform sampler2D u_jointTexture;

out vec3 v_normal;

mat4 getBoneMatrix(uint jointNdx) {
  return mat4(
    texelFetch(u_jointTexture, ivec2(0, jointNdx), 0),
    texelFetch(u_jointTexture, ivec2(1, jointNdx), 0),
    texelFetch(u_jointTexture, ivec2(2, jointNdx), 0),
    texelFetch(u_jointTexture, ivec2(3, jointNdx), 0));
}

void main() {
  mat4 skinMatrix = getBoneMatrix(a_JOINTS_0[0]) * a_WEIGHTS_0[0] +
                    getBoneMatrix(a_JOINTS_0[1]) * a_WEIGHTS_0[1] +
                    getBoneMatrix(a_JOINTS_0[2]) * a_WEIGHTS_0[2] +
                    getBoneMatrix(a_JOINTS_0[3]) * a_WEIGHTS_0[3];
  mat4 world = u_world * skinMatrix;
  gl_Position = u_projection * u_view * world * a_POSITION;
  v_normal = mat3(world) * a_NORMAL;

  // for debugging .. see article
  //gl_Position = u_projection * u_view *  a_POSITION;
  //v_normal = a_NORMAL;
  //v_normal = a_WEIGHTS_0.xyz * 2. - 1.;
  //v_normal = vec3(a_JOINTS_0.xyz) / float(textureSize(u_jointTexture, 0).y - 1) * 2. - 1.;
}
`;
const fs = `#version 300 es
precision highp float;

in vec3 v_normal;

uniform vec4 u_diffuse;
uniform vec3 u_lightDirection;

out vec4 outColor;

void main () {
  vec3 normal = normalize(v_normal);
  float light = dot(u_lightDirection, normal) * .5 + .5;
  outColor = vec4(u_diffuse.rgb * light, u_diffuse.a);

  // for debugging .. see article
  //outColor = vec4(1, 0, 0, 1);
  //outColor = vec4(v_normal * .5 + .5, 1);
}
`;
const meshVS = `#version 300 es
in vec4 a_POSITION;
in vec3 a_NORMAL;

uniform mat4 u_projection;
uniform mat4 u_view;
uniform mat4 u_world;

out vec3 v_normal;

void main() {
  gl_Position = u_projection * u_view * u_world * a_POSITION;
  v_normal = mat3(u_world) * a_NORMAL;
}
`;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Get A WebGL context
        if (!gl) {
            return;
        }
        // Specify the locations of the attributes so they'll
        // match across programs
        const programOptions = {
            attribLocations: {
                a_POSITION: 0,
                a_NORMAL: 1,
                a_WEIGHTS_0: 2,
                a_JOINTS_0: 3,
            },
        };
        // compiles and links the shaders, looks up attribute and uniform locations
        const skinProgramInfo = twgl.createProgramInfo(gl, [skinVS, fs], programOptions);
        const meshProgramInfo = twgl.createProgramInfo(gl, [meshVS, fs], programOptions);
        class Skin {
            constructor(joints, inverseBindMatrixData) {
                this.joints = joints;
                this.inverseBindMatrices = [];
                this.jointMatrices = [];
                // allocate enough space for one matrix per joint
                this.jointData = new Float32Array(joints.length * 16);
                // create views for each joint and inverseBindMatrix
                for (let i = 0; i < joints.length; ++i) {
                    this.inverseBindMatrices.push(new Float32Array(inverseBindMatrixData.buffer, inverseBindMatrixData.byteOffset + Float32Array.BYTES_PER_ELEMENT * 16 * i, 16));
                    this.jointMatrices.push(new Float32Array(this.jointData.buffer, Float32Array.BYTES_PER_ELEMENT * 16 * i, 16));
                }
                // create a texture to hold the joint matrices
                this.jointTexture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, this.jointTexture);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            }
            update(node) {
                const globalWorldInverse = twgl.m4.inverse(node.worldMatrix);
                // go through each joint and get its current worldMatrix
                // apply the inverse bind matrices and store the
                // entire result in the texture
                for (let j = 0; j < this.joints.length; ++j) {
                    const joint = this.joints[j];
                    const dst = this.jointMatrices[j];
                    twgl.m4.multiply(globalWorldInverse, joint.worldMatrix, dst);
                    twgl.m4.multiply(dst, this.inverseBindMatrices[j], dst);
                }
                gl.bindTexture(gl.TEXTURE_2D, this.jointTexture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, 4, this.joints.length, 0, gl.RGBA, gl.FLOAT, this.jointData);
            }
        }
        /**
         * creates a matrix from translation, quaternion, scale
         * @param {Number[]} translation [x, y, z] translation
         * @param {Number[]} quaternion [x, y, z, z] quaternion rotation
         * @param {Number[]} scale [x, y, z] scale
         * @param {Matrix4} [dst] optional matrix to store result
         * @return {Matrix4} dst or a new matrix if none provided
         */
        function compose(translation, quaternion, scale, dst) {
            dst = dst || new MatType(16);
            const x = quaternion[0];
            const y = quaternion[1];
            const z = quaternion[2];
            const w = quaternion[3];
            const x2 = x + x;
            const y2 = y + y;
            const z2 = z + z;
            const xx = x * x2;
            const xy = x * y2;
            const xz = x * z2;
            const yy = y * y2;
            const yz = y * z2;
            const zz = z * z2;
            const wx = w * x2;
            const wy = w * y2;
            const wz = w * z2;
            const sx = scale[0];
            const sy = scale[1];
            const sz = scale[2];
            dst[0] = (1 - (yy + zz)) * sx;
            dst[1] = (xy + wz) * sx;
            dst[2] = (xz - wy) * sx;
            dst[3] = 0;
            dst[4] = (xy - wz) * sy;
            dst[5] = (1 - (xx + zz)) * sy;
            dst[6] = (yz + wx) * sy;
            dst[7] = 0;
            dst[8] = (xz + wy) * sz;
            dst[9] = (yz - wx) * sz;
            dst[10] = (1 - (xx + yy)) * sz;
            dst[11] = 0;
            dst[12] = translation[0];
            dst[13] = translation[1];
            dst[14] = translation[2];
            dst[15] = 1;
            return dst;
        }
        class TRS {
            constructor(position = [0, 0, 0], rotation = [0, 0, 0, 1], scale = [1, 1, 1]) {
                this.position = position;
                this.rotation = rotation;
                this.scale = scale;
            }
            getMatrix(dst) {
                dst = dst || new Float32Array(16);
                compose(this.position, this.rotation, this.scale, dst);
                return dst;
            }
        }
        class Node {
            constructor(source, name) {
                this.name = name;
                this.source = source;
                this.parent = null;
                this.children = [];
                this.localMatrix = twgl.m4.identity();
                this.worldMatrix = twgl.m4.identity();
                this.drawables = [];
            }
            setParent(parent) {
                if (this.parent) {
                    this.parent._removeChild(this);
                    this.parent = null;
                }
                if (parent) {
                    parent._addChild(this);
                    this.parent = parent;
                }
            }
            updateWorldMatrix(parentWorldMatrix) {
                const source = this.source;
                if (source) {
                    source.getMatrix(this.localMatrix);
                }
                if (parentWorldMatrix) {
                    // a matrix was passed in so do the math
                    twgl.m4.multiply(parentWorldMatrix, this.localMatrix, this.worldMatrix);
                }
                else {
                    // no matrix was passed in so just copy local to world
                    twgl.m4.copy(this.localMatrix, this.worldMatrix);
                }
                // now process all the children
                const worldMatrix = this.worldMatrix;
                for (const child of this.children) {
                    child.updateWorldMatrix(worldMatrix);
                }
            }
            traverse(fn) {
                fn(this);
                for (const child of this.children) {
                    child.traverse(fn);
                }
            }
            _addChild(child) {
                this.children.push(child);
            }
            _removeChild(child) {
                const ndx = this.children.indexOf(child);
                this.children.splice(ndx, 1);
            }
        }
        class SkinRenderer {
            constructor(mesh, skin) {
                this.mesh = mesh;
                this.skin = skin;
            }
            render(node, projection, view, sharedUniforms) {
                const { skin, mesh } = this;
                skin.update(node);
                gl.useProgram(skinProgramInfo.program);
                for (const primitive of mesh.primitives) {
                    gl.bindVertexArray(primitive.vao);
                    twgl.setUniforms(skinProgramInfo, {
                        u_projection: projection,
                        u_view: view,
                        u_world: node.worldMatrix,
                        u_numJoints: skin.joints.length,
                    }, primitive.material.uniforms, sharedUniforms);
                    twgl.drawBufferInfo(gl, primitive.bufferInfo);
                }
            }
        }
        class MeshRednerer {
            constructor(mesh) {
                this.mesh = mesh;
            }
            render(node, projection, view, sharedUniforms) {
                const { mesh } = this;
                gl.useProgram(meshProgramInfo.program);
                for (const primitive of mesh.primitives) {
                    gl.bindVertexArray(primitive.vao);
                    twgl.setUniforms(meshProgramInfo, {
                        u_projection: projection,
                        u_view: view,
                        u_world: node.worldMatrix,
                    }, primitive.material.uniforms, sharedUniforms);
                    twgl.drawBufferInfo(gl, primitive.bufferInfo);
                }
            }
        }
        function throwNoKey(key) {
            throw new Error(`no key: ${key}`);
        }
        const accessorTypeToNumComponentsMap = {
            'SCALAR': 1,
            'VEC2': 2,
            'VEC3': 3,
            'VEC4': 4,
            'MAT2': 4,
            'MAT3': 9,
            'MAT4': 16,
        };
        function accessorTypeToNumComponents(type) {
            return accessorTypeToNumComponentsMap[type] || throwNoKey(type);
        }
        const glTypeToTypedArrayMap = {
            '5120': Int8Array,
            '5121': Uint8Array,
            '5122': Int16Array,
            '5123': Uint16Array,
            '5124': Int32Array,
            '5125': Uint32Array,
            '5126': Float32Array, // gl.FLOAT
        };
        // Given a GL type return the TypedArray needed
        function glTypeToTypedArray(type) {
            return glTypeToTypedArrayMap[type] || throwNoKey(type);
        }
        // given an accessor index return both the accessor and
        // a TypedArray for the correct portion of the buffer
        function getAccessorTypedArrayAndStride(gl, gltf, accessorIndex) {
            const accessor = gltf.accessors[accessorIndex];
            const bufferView = gltf.bufferViews[accessor.bufferView];
            const TypedArray = glTypeToTypedArray(accessor.componentType);
            const buffer = gltf.buffers[bufferView.buffer];
            return {
                accessor,
                array: new TypedArray(buffer, bufferView.byteOffset + (accessor.byteOffset || 0), accessor.count * accessorTypeToNumComponents(accessor.type)),
                stride: bufferView.byteStride || 0,
            };
        }
        // Given an accessor index return a WebGLBuffer and a stride
        function getAccessorAndWebGLBuffer(gl, gltf, accessorIndex) {
            const accessor = gltf.accessors[accessorIndex];
            const bufferView = gltf.bufferViews[accessor.bufferView];
            if (!bufferView.webglBuffer) {
                const buffer = gl.createBuffer();
                const target = bufferView.target || gl.ARRAY_BUFFER;
                const arrayBuffer = gltf.buffers[bufferView.buffer];
                const data = new Uint8Array(arrayBuffer, bufferView.byteOffset, bufferView.byteLength);
                gl.bindBuffer(target, buffer);
                gl.bufferData(target, data, gl.STATIC_DRAW);
                bufferView.webglBuffer = buffer;
            }
            return {
                accessor,
                buffer: bufferView.webglBuffer,
                stride: bufferView.stride || 0,
            };
        }
        function loadGLTF(url) {
            return __awaiter(this, void 0, void 0, function* () {
                const gltf = yield loadJSON(url);
                // load all the referenced files relative to the gltf file
                gltf.buffers = yield Promise.all(gltf.buffers.map((buffer) => {
                    return loadBinary("static/gltf/" + buffer.uri);
                }));
                const defaultMaterial = {
                    uniforms: {
                        u_diffuse: [.5, .8, 1, 1],
                    },
                };
                // setup meshes
                gltf.meshes.forEach((mesh) => {
                    mesh.primitives.forEach((primitive) => {
                        const attribs = {};
                        let numElements;
                        for (const [attribName, index] of Object.entries(primitive.attributes)) {
                            const { accessor, buffer, stride } = getAccessorAndWebGLBuffer(gl, gltf, index);
                            numElements = accessor.count;
                            attribs[`a_${attribName}`] = {
                                buffer,
                                type: accessor.componentType,
                                numComponents: accessorTypeToNumComponents(accessor.type),
                                stride,
                                offset: accessor.byteOffset | 0,
                            };
                        }
                        const bufferInfo = {
                            attribs,
                            numElements,
                        };
                        if (primitive.indices !== undefined) {
                            const { accessor, buffer } = getAccessorAndWebGLBuffer(gl, gltf, primitive.indices);
                            bufferInfo.numElements = accessor.count;
                            bufferInfo.indices = buffer;
                            bufferInfo.elementType = accessor.componentType;
                        }
                        primitive.bufferInfo = bufferInfo;
                        // make a VAO for this primitive
                        // NOTE: This is problematic. In order to automagically
                        // setup the attributes we need a ProgramInfo since a ProgramInfo
                        // contains the type and size of each attribute. But, for this to
                        // work for all situation we'd need a ProgramInfo that uses every
                        // possible attribute and for all similar attributes to use the
                        // same location. For this particular situation we use
                        // skinProgramInfo and above where we compiled the shaders we
                        // set the locations but for a larger program we'd need some other
                        // solution
                        primitive.vao = twgl.createVAOFromBufferInfo(gl, skinProgramInfo, primitive.bufferInfo);
                        // save the material info for this primitive
                        primitive.material = gltf.materials && gltf.materials[primitive.material] || defaultMaterial;
                    });
                });
                const skinNodes = [];
                const origNodes = gltf.nodes;
                gltf.nodes = gltf.nodes.map((n) => {
                    const { name, skin, mesh, translation, rotation, scale } = n;
                    const trs = new TRS(translation, rotation, scale);
                    const node = new Node(trs, name);
                    const realMesh = gltf.meshes[mesh];
                    if (skin !== undefined) {
                        skinNodes.push({ node, mesh: realMesh, skinNdx: skin });
                    }
                    else if (realMesh) {
                        node.drawables.push(new MeshRenderer(realMesh));
                    }
                    return node;
                });
                // setup skins
                gltf.skins = gltf.skins.map((skin) => {
                    const joints = skin.joints.map(ndx => gltf.nodes[ndx]);
                    const { stride, array } = getAccessorTypedArrayAndStride(gl, gltf, skin.inverseBindMatrices);
                    return new Skin(joints, array);
                });
                // Add SkinRenderers to nodes with skins
                for (const { node, mesh, skinNdx } of skinNodes) {
                    node.drawables.push(new SkinRenderer(mesh, gltf.skins[skinNdx]));
                }
                // arrange nodes into graph
                gltf.nodes.forEach((node, ndx) => {
                    const children = origNodes[ndx].children;
                    if (children) {
                        addChildren(gltf.nodes, node, children);
                    }
                });
                // setup scenes
                for (const scene of gltf.scenes) {
                    scene.root = new Node(new TRS(), scene.name);
                    addChildren(gltf.nodes, scene.root, scene.nodes);
                }
                return gltf;
            });
        }
        function addChildren(nodes, node, childIndices) {
            childIndices.forEach((childNdx) => {
                const child = nodes[childNdx];
                child.setParent(node);
            });
        }
        function loadBinary(url) {
            return __awaiter(this, void 0, void 0, function* () {
                return device.readBuffer(url);
            });
        }
        function loadJSON(url) {
            return __awaiter(this, void 0, void 0, function* () {
                return device.readJson(url);
            });
        }
        const gltf = yield loadGLTF('/static/gltf/whale.CYCLES.gltf');
        function degToRad(deg) {
            return deg * Math.PI / 180;
        }
        const origMatrices = new Map();
        function quatFromRotationMatrix(m, dst) {
            // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
            // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
            const m11 = m[0];
            const m12 = m[4];
            const m13 = m[8];
            const m21 = m[1];
            const m22 = m[5];
            const m23 = m[9];
            const m31 = m[2];
            const m32 = m[6];
            const m33 = m[10];
            const trace = m11 + m22 + m33;
            if (trace > 0) {
                const s = 0.5 / Math.sqrt(trace + 1);
                dst[3] = 0.25 / s;
                dst[0] = (m32 - m23) * s;
                dst[1] = (m13 - m31) * s;
                dst[2] = (m21 - m12) * s;
            }
            else if (m11 > m22 && m11 > m33) {
                const s = 2 * Math.sqrt(1 + m11 - m22 - m33);
                dst[3] = (m32 - m23) / s;
                dst[0] = 0.25 * s;
                dst[1] = (m12 + m21) / s;
                dst[2] = (m13 + m31) / s;
            }
            else if (m22 > m33) {
                const s = 2 * Math.sqrt(1 + m22 - m11 - m33);
                dst[3] = (m13 - m31) / s;
                dst[0] = (m12 + m21) / s;
                dst[1] = 0.25 * s;
                dst[2] = (m23 + m32) / s;
            }
            else {
                const s = 2 * Math.sqrt(1 + m33 - m11 - m22);
                dst[3] = (m21 - m12) / s;
                dst[0] = (m13 + m31) / s;
                dst[1] = (m23 + m32) / s;
                dst[2] = 0.25 * s;
            }
        }
        function determinate(m) {
            var m00 = m[0 * 4 + 0];
            var m01 = m[0 * 4 + 1];
            var m02 = m[0 * 4 + 2];
            var m03 = m[0 * 4 + 3];
            var m10 = m[1 * 4 + 0];
            var m11 = m[1 * 4 + 1];
            var m12 = m[1 * 4 + 2];
            var m13 = m[1 * 4 + 3];
            var m20 = m[2 * 4 + 0];
            var m21 = m[2 * 4 + 1];
            var m22 = m[2 * 4 + 2];
            var m23 = m[2 * 4 + 3];
            var m30 = m[3 * 4 + 0];
            var m31 = m[3 * 4 + 1];
            var m32 = m[3 * 4 + 2];
            var m33 = m[3 * 4 + 3];
            var tmp_0 = m22 * m33;
            var tmp_1 = m32 * m23;
            var tmp_2 = m12 * m33;
            var tmp_3 = m32 * m13;
            var tmp_4 = m12 * m23;
            var tmp_5 = m22 * m13;
            var tmp_6 = m02 * m33;
            var tmp_7 = m32 * m03;
            var tmp_8 = m02 * m23;
            var tmp_9 = m22 * m03;
            var tmp_10 = m02 * m13;
            var tmp_11 = m12 * m03;
            var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
                (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
            var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
                (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
            var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
                (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
            var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
                (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
            return 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
        }
        function decompose(mat, translation, quaternion, scale) {
            let sx = twgl.v3.length(mat.slice(0, 3));
            const sy = twgl.v3.length(mat.slice(4, 7));
            const sz = twgl.v3.length(mat.slice(8, 11));
            // if determinate is negative, we need to invert one scale
            const det = determinate(mat);
            if (det < 0) {
                sx = -sx;
            }
            translation[0] = mat[12];
            translation[1] = mat[13];
            translation[2] = mat[14];
            // scale the rotation part
            const matrix = twgl.m4.copy(mat);
            const invSX = 1 / sx;
            const invSY = 1 / sy;
            const invSZ = 1 / sz;
            matrix[0] *= invSX;
            matrix[1] *= invSX;
            matrix[2] *= invSX;
            matrix[4] *= invSY;
            matrix[5] *= invSY;
            matrix[6] *= invSY;
            matrix[8] *= invSZ;
            matrix[9] *= invSZ;
            matrix[10] *= invSZ;
            quatFromRotationMatrix(matrix, quaternion);
            scale[0] = sx;
            scale[1] = sy;
            scale[2] = sz;
        }
        function animSkin(skin, a) {
            for (let i = 0; i < skin.joints.length; ++i) {
                const joint = skin.joints[i];
                // if there is no matrix saved for this joint
                if (!origMatrices.has(joint)) {
                    // save a matrix for joint
                    origMatrices.set(joint, joint.source.getMatrix());
                }
                // get the original matrix
                const origMatrix = origMatrices.get(joint);
                // rotate it
                const m = twgl.m4.rotateX(origMatrix, a);
                // decompose it back into position, rotation, scale
                // into the joint
                decompose(m, joint.source.position, joint.source.rotation, joint.source.scale);
            }
        }
        function render(time) {
            time *= 0.001; // convert to seconds
            twgl.resizeCanvasToDisplaySize(gl.canvas);
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.enable(gl.DEPTH_TEST);
            gl.enable(gl.CULL_FACE);
            gl.clearColor(.1, .1, .1, 1);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            const fieldOfViewRadians = degToRad(60);
            const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
            const projection = twgl.m4.perspective(fieldOfViewRadians, aspect, 1, 2000);
            const cameraPosition = [10, 0, -5];
            const target = [0, 0, -10];
            // for debugging .. see article
            // const cameraPosition = [5, 0, 5];
            // const target = [0, 0, 0];
            const up = [0, 1, 0];
            // Compute the camera's matrix using look at.
            const camera = twgl.m4.lookAt(cameraPosition, target, up);
            // Make a view matrix from the camera matrix.
            const view = twgl.m4.inverse(camera);
            animSkin(gltf.skins[0], Math.sin(time) * .5);
            const sharedUniforms = {
                u_lightDirection: twgl.v3.normalize([-1, 3, 5]),
            };
            function renderDrawables(node) {
                for (const drawable of node.drawables) {
                    drawable.render(node, projection, view, sharedUniforms);
                }
            }
            for (const scene of gltf.scenes) {
                // updatte all world matices in the scene.
                scene.root.updateWorldMatrix();
                // walk the scene and render all renderables
                scene.root.traverse(renderDrawables);
            }
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    });
}
//# sourceMappingURL=game.js.map