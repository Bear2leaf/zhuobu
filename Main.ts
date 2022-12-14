import { fs, gl, twgl, vs } from "./global.js";
import Node from "./Node.js";
import TRS from "./TRS.js";


function degToRad(d: number) {
    return d * Math.PI / 180;
}
// this function takes a set of indexed vertices
// It deindexed them. It then adds random vertex
// colors to each triangle. Finally it passes
// the result to createBufferInfoFromArrays and
// returns a twgl.BufferInfo
function createFlattenedVertices(gl: WebGL2RenderingContext, vertices: { [key: string]: twgl.primitives.TypedArray; }, vertsPerColor: number) {
    let last: number;
    return twgl.createBufferInfoFromArrays(
        gl,
        twgl.primitives.makeRandomVertexColors(
            twgl.primitives.deindexVertices(vertices),
            {
                vertsPerColor: vertsPerColor || 1,
                rand: function (ndx, channel) {
                    if (channel === 0) {
                        last = 128 + Math.random() * 128 | 0;
                    }
                    return channel < 3 ? last : 255;
                },
            })
    );
}

function createFlattenedFunc(createVerticesFunc: Function, vertsPerColor: number) {
    return function (...args: [WebGL2RenderingContext, number, number, number]) {
        const arrays = createVerticesFunc.apply(null, Array.prototype.slice.call(args, 1));
        return createFlattenedVertices(gl, arrays, vertsPerColor);
    };
}

export default class Main {
    constructor() {
        twgl.setAttributePrefix("a_");

        const sphereBufferInfo = createFlattenedFunc(twgl.primitives.createSphereVertices, 6)(gl, 10, 12, 16);
        const programInfo = twgl.createProgramInfo(gl
            , [vs, fs])
        const sphereVAOInfo = twgl.createVertexArrayInfo(gl, programInfo, sphereBufferInfo)!;
        const fieldOfViewRadians = degToRad(60);


        const sunTRS = new TRS();
        twgl.v3.copy([5, 5, 5], sunTRS.scale);
        const sunNode = new Node(sunTRS);
        sunNode.drawInfo = {
            uniforms: {
                u_colorOffset: [0.6, 0.6, 0, 1],
                u_colorMult: [0.4, 0.4, 0, 1],
            },
            programInfo,
            bufferInfo: sphereBufferInfo,
            vertexArrayInfo: sphereVAOInfo
        };
        const earthTRS = new TRS();
        twgl.v3.copy([2, 2, 2], earthTRS.scale);
        const earthNode = new Node(earthTRS);
        earthNode.drawInfo = {
            uniforms: {
                u_colorOffset: [0.2, 0.5, 0.8, 1],
                u_colorMult: [0.8, 0.5, 0.2, 1],
            },
            programInfo: programInfo,
            bufferInfo: sphereBufferInfo,
            vertexArrayInfo: sphereVAOInfo,
        };
        const moonTRS = new TRS();
        twgl.v3.copy([0.4, 0.4, 0.4], moonTRS.scale);
        const moonNode = new Node(moonTRS);
        moonNode.drawInfo = {
            uniforms: {
                u_colorOffset: [0.6, 0.6, 0.6, 1],
                u_colorMult: [0.1, 0.1, 0.1, 1],
            },
            programInfo: programInfo,
            bufferInfo: sphereBufferInfo,
            vertexArrayInfo: sphereVAOInfo,
        };
        const solarSystemNode = new Node();
        const earthOrbitNode = new Node();
        // earth orbit 100 units from the sun
        twgl.m4.translation([100, 0, 0], earthOrbitNode.localMatrix);
        const moonOrbitNode = new Node();

        // moon 30 units from the earth
        twgl.m4.translation([30, 0, 0], moonOrbitNode.localMatrix)

        // connect the celetial objects
        sunNode.setParent(solarSystemNode);
        earthOrbitNode.setParent(solarSystemNode);
        earthNode.setParent(earthOrbitNode);
        moonOrbitNode.setParent(earthOrbitNode);
        moonNode.setParent(moonOrbitNode);


        const objects = [
            sunNode,
            earthNode,
            moonNode,
        ];

        const objectsToDraw = [
            sunNode.drawInfo,
            earthNode.drawInfo,
            moonNode.drawInfo,
        ];
        console.log(solarSystemNode)
        requestAnimationFrame(drawScene);

        // Draw the scene.
        function drawScene(time: number) {

            if (!sunNode.trs || !earthNode.trs || !moonNode.trs || solarSystemNode.trs || earthOrbitNode.trs || moonOrbitNode.trs) {
                throw new Error("wrong trs set");
            }
            time *= 0.001;

            twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);

            // Tell WebGL how to convert from clip space to pixels
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

            gl.enable(gl.CULL_FACE);
            gl.enable(gl.DEPTH_TEST);

            // Clear the canvas AND the depth buffer.
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            // Compute the projection matrix
            const aspect = gl.canvas.width / gl.canvas.height;
            const projectionMatrix =
                twgl.m4.perspective(fieldOfViewRadians, aspect, 1, 2000);

            // Compute the camera's matrix using look at.
            const cameraPosition = [0, -400, 0];
            const target = [0, 0, 0];
            const up = [0, 0, 1];
            const cameraMatrix = twgl.m4.lookAt(cameraPosition, target, up);

            // Make a view matrix from the camera matrix.
            const viewMatrix = twgl.m4.inverse(cameraMatrix);

            const viewProjectionMatrix = twgl.m4.multiply(projectionMatrix, viewMatrix);

            // update the local matrices for each object.
            twgl.m4.multiply(twgl.m4.rotationY(0.01), earthOrbitNode.localMatrix, earthOrbitNode.localMatrix);
            twgl.m4.multiply(twgl.m4.rotationY(0.01), moonOrbitNode.localMatrix, moonOrbitNode.localMatrix);

            // spin the sun
            sunNode.trs.rotation[1] += 0.005;

            // spin the earth
            earthNode.trs.rotation[1] += 0.05;

            // spin the moon
            moonNode.trs.rotation[1] -= 0.01;

            // Update all world matrices in the scene graph
            solarSystemNode.updateWorldMatrix();

            // Compute all the matrices for rendering
            objects.forEach(function (object) {

                if (!object.drawInfo) {
                    throw new Error("no draw Info");
                }
                object.drawInfo.uniforms.u_matrix = twgl.m4.multiply(viewProjectionMatrix, object.worldMatrix);
            });
            // ------ Draw the objects --------

            twgl.drawObjectList(gl, objectsToDraw);

            requestAnimationFrame(drawScene);
        }
    }
}