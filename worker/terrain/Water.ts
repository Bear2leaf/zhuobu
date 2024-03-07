

/**
 * Generates all the vertex data for a grid square. The corner positions of
 * the grid square are calculated and then the data for the two triangles in
 * this square is stored. Note that the data for the two triangles is stored
 * separately, meaning that the data for 6 vertices is stored.
 * 
 * @param col
 *            - The column number of this grid square in the grid.
 * @param row
 *            - The row number of this grid square in the grid.
 * @param buffer
 *            - The buffer where all the vertex data is being collected.
 */
function storeGridSquare(col: number, row: number, buffer: number[][]) {
    const cornerPos = calculateCornerPositions(col, row);
    storeTriangle(cornerPos, buffer, true);
    storeTriangle(cornerPos, buffer, false);
}/**
	 * Stores the vertex data for a given triangle of the mesh into the
	 * ByteBuffer. First it is determined which 3 of the vertices of the current
	 * grid square make up the triangle. The indexes for a grid square are as
	 * follows:
	 * 
	 * 0 = top left, 1 = bottom left, 2 = top right, 3 = bottom right.
	 * 
	 * This is the order that the corner positions are stored in the "cornerPos"
	 * array.
	 * 
	 * Once it has been determined which 3 vertices make up the triangle, the
	 * vertex data for those 3 vertices is stored in the ByteBuffer. For each
	 * vertex the x,z position is stored, along with the 4 indicator values.
	 * 
	 * @param cornerPos
	 *            - The 4 corner positions for the current grid square, stored
	 *            in the order specified above.
	 * @param buffer
	 *            - The buffer containing all the vertex data for the mesh.
	 * @param left
	 *            - Indicates whether the triangle being stored is the triangle
	 *            on the left or the right of the current grid square.
	 */
function storeTriangle(cornerPos: number[][], buffer: number[][], left: boolean) {
    const index0 = left ? 0 : 2;
    const index1 = 1;
    const index2 = left ? 2 : 3;
    packVertexData(cornerPos[index0], getIndicators(index0, cornerPos, index1, index2), buffer);
    packVertexData(cornerPos[index1], getIndicators(index1, cornerPos, index2, index0), buffer);
    packVertexData(cornerPos[index2], getIndicators(index2, cornerPos, index0, index1), buffer);
}


/**
 * Calculates the x,z positions of the 4 corners of a grid square.
 * 
 * @param col
 *            - The column number of the grid square.
 * @param row
 *            - The row number of the grid square.
 * @return An array contain 4 positions. Each 2D position is the x,z
 *         position of one of the corners. The corners are stored in the
 *         following order: 0 = top left, 1 = bottom left, 2 = top right, 3
 *         = bottom right
 */
function calculateCornerPositions(col: number, row: number) {
    const vertices = new Array(4);
    vertices[0] = [col, row];
    vertices[1] = [col, row + 1];
    vertices[2] = [col + 1, row];
    vertices[3] = [col + 1, row + 1];
    return vertices;
}

function subtract(a: number[], b: number[]): number[] {
    return [
        a[0] - b[0],
        a[1] - b[1]
    ]
}

/**
 * Gets the 4 indicator values for a certain vertex. This is done by
 * calculating the vector from the current vertex to each of the other two
 * vertices in the current triangle.
 * 
 * The 3 vertex positions are taken from the "vertexPositions" array, and
 * then the offset vectors are calculated by subtracting the current vertex
 * position from the other vertex position.
 * 
 * The offsets are then stored in an array as bytes (not converted to bytes,
 * but simply cast to bytes) and returned. The size of each grid square must
 * be an integer value for this to work, otherwise the offsets wouldn't be
 * able to be represented correctly as bytes.
 * 
 * @param currentVertex
 *            - The index of the current vertex in the current grid square
 *            (A number between 0 and 3).
 * @param vertexPositions
 *            - The 4 corner positions of the current grid square, stored in
 *            the following order: 0 = top left, 1 = bottom left, 2 = top
 *            right, 3 = bottom right
 * @param vertex1
 *            - The index of one of the other vertices in the triangle
 *            (number between 0 and 3).
 * @param vertex2
 *            - The index of the other vertex in the triangle (number
 *            between 0 and 3).
 * @return
 */
function getIndicators(currentVertex: number, vertexPositions: number[][], vertex1: number, vertex2: number) {
    const currentVertexPos = vertexPositions[currentVertex];
    const vertex1Pos = vertexPositions[vertex1];
    const vertex2Pos = vertexPositions[vertex2];
    const offset1 = subtract(vertex1Pos, currentVertexPos);
    const offset2 = subtract(vertex2Pos, currentVertexPos);
    return [...offset1, ...offset2];
}

export default class Water {
    private readonly vertices: number[] = []
    private readonly indicators: number[] = []
    constructor() {
        const data = this.createMeshData(100);
        this.vertices = data[0];
        this.indicators = data[1];
    }
    static create() {
        const object = new Water();
        return object;
    }
    createMeshData(gridCount: number) {
        const buffer: number[][] = [[], []];
        for (let row = 0; row < gridCount; row++) {
            for (let col = 0; col < gridCount; col++) {
                storeGridSquare(col, row, buffer);
            }
        }
        return buffer;
    }
    getAttributes(): {
        name: string;
        type?: "FLOAT";
        value: number[];
        size?: number;
    }[] {
        return [
            { name: "a_position", type: "FLOAT", value: this.vertices, size: 2 },
            { name: "a_indicator", type: "FLOAT", value: this.indicators, size: 4 },
        ]
    }
    getUniforms(): { name: string; type: "1iv" | "1i" | "1f" | "2fv" | "3fv" | "4fv" | "Matrix4fv"; value: number[]; }[] {
        return [
            { name: "u_textureRefract", type: "1i", value: [0] },
            { name: "u_textureReflect", type: "1i", value: [1] },
            { name: "u_textureDepth", type: "1i", value: [2] },
        ]
    }

}

function packVertexData(arg0: number[], arg1: number[], buffer: number[][]) {
    buffer[0].push(...arg0);
    buffer[1].push(...arg1);
}
