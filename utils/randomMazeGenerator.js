export function MazeGenerator(floor = 1, verticalCell = 6, horizontalCell = 6, start = [1, 1, 1]) {

    /* initialize matrix*/
    this.mazeMatrix = [];
    this.LAYER_N = floor * 2;
    this.VERTICAL_N = (verticalCell * 2) + 1;
    this.HORIZONTAL_N = (horizontalCell * 2) + 1;
    /* fill matrix with 1 */
    for (let y = 0; y < this.LAYER_N; y++) {
        let planeElement = [];
        for (let z = 0; z < this.VERTICAL_N; z++) {
            let lineElement = [];
            for (let x = 0; x < this.HORIZONTAL_N; x++) {
                lineElement.push(1);
            }
            planeElement.push(lineElement);
        }
        this.mazeMatrix.push(planeElement);
    }
    this.mazeMatrix[1][1][0] = 0;
    this.mazeMatrix[this.LAYER_N - 1][this.VERTICAL_N - 2][this.HORIZONTAL_N - 1] = 0
    // console.log('maze matrix dimension', this.mazeMatrix.length, this.mazeMatrix[0].length, this.mazeMatrix[0][0].length);

    /* print the matrix for debugging */
    this.printMatrix = function () {
        for (let y = 0; y < this.mazeMatrix.length; y++) {
            if (y & 1) {
                console.log("\nLayer", y);
                for (let z = 0; z < this.mazeMatrix[0].length; z++) {
                    console.log(this.mazeMatrix[y][z].join(" "));
                }
            }
        }
    }

    /* current position pointer */
    this.posPointer = function (posY = start[0], posZ = start[1], posX = start[2]) {
        this.y = posY;
        this.z = posZ;
        this.x = posX;
    };

    /* neighbor picker */
    this.pickNeighbor = function (currentPosition) {
        const neighbors = [];
        const { y, z, x } = currentPosition;

        // up
        if (y <= this.LAYER_N - 3) {
            if (this.mazeMatrix[y + 2][z][x] === 1) {
                neighbors.push(1);
            }
        }

        // down
        if (y >= 3) {
            if (this.mazeMatrix[y - 2][z][x] === 1) {
                neighbors.push(2);
            }
        }

        // front
        if (z >= 3) {
            if (this.mazeMatrix[y][z - 2][x] === 1) {
                neighbors.push(3);
            }
        }

        // back
        if (z <= this.VERTICAL_N - 3) {
            if (this.mazeMatrix[y][z + 2][x] === 1) {
                neighbors.push(4);
            }
        }

        // left
        if (x >= 3) {
            if (this.mazeMatrix[y][z][x - 2] === 1) {
                neighbors.push(5);
            }
        }

        // right
        if (x <= this.HORIZONTAL_N - 3) {
            if (this.mazeMatrix[y][z][x + 2] === 1) {
                neighbors.push(6);
            }
        }

        if (neighbors.length === 0) {
            return null;
        }
        else {
            // console.log('available neigbors', neighbors);

            switch (neighbors[Math.floor(Math.random() * neighbors.length)]) {
                case 1:
                    this.mazeMatrix[y + 1][z][x] = 0;
                    return new this.posPointer(y + 2, z, x);
                case 2:
                    this.mazeMatrix[y - 1][z][x] = 0;
                    return new this.posPointer(y - 2, z, x);
                case 3:
                    this.mazeMatrix[y][z - 1][x] = 0;
                    return new this.posPointer(y, z - 2, x);
                case 4:
                    this.mazeMatrix[y][z + 1][x] = 0;
                    return new this.posPointer(y, z + 2, x);
                case 5:
                    this.mazeMatrix[y][z][x - 1] = 0;
                    return new this.posPointer(y, z, x - 2);
                case 6:
                    this.mazeMatrix[y][z][x + 1] = 0;
                    return new this.posPointer(y, z, x + 2);
                default:
                    console.log('default case');
                    return null;
            }
        }

    }

    /* generate maze matrix */
    this.generateMaze = () => {
        let currentPos = new this.posPointer(1, 1, 1);
        let nextPos;
        const posHistory = [];
        posHistory.push(currentPos);
        while (posHistory.length > 0) {
            let { y, z, x } = currentPos;
            this.mazeMatrix[y][z][x] = 0;
            // this.printMatrix();
            nextPos = this.pickNeighbor(currentPos);
            if (nextPos) {
                currentPos = nextPos;
                posHistory.push(currentPos);
            }
            else {
                currentPos = posHistory.pop();
            }
        }
        // this.printMatrix();
    }
}

// const myMaze = new MazeGenerator();
// myMaze.generateMaze();