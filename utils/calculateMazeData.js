import { Box3, Vector3 } from 'three'

export function calculateMazeData(matrixData, params) {
    /* construct box array */
    const mazeBoxes = []
    const liftBoxes = []

    /* some constants */
    const HEIGHT = params.wall.HEIGHT
    const THICKNESS = params.wall.THICKNESS
    const SPACE = params.wall.SPACE
    const POS_Y = (HEIGHT / 2)
    const FLOOR_INIT_Y = (-THICKNESS / 2)

    /* geometry */
    // wall
    const pilarWallGeo = [THICKNESS, HEIGHT, THICKNESS]
    const horizontalWallGeo = [SPACE, HEIGHT, THICKNESS]
    const verticalWallGeo = [THICKNESS, HEIGHT, SPACE]
    // lift
    const liftGeo = [SPACE, 2 * (HEIGHT + THICKNESS), SPACE]

    for (let h = 0; h < matrixData.length; h++) {
        let mazeBoxesIdx;
        if (h & 1) {
            mazeBoxes.push([]);
            mazeBoxesIdx = mazeBoxes.length - 1;
        }
        for (let i = 0; i < matrixData[h].length; i++) {
            for (let j = 0; j < matrixData[h][i].length; j++) {
                const idxJ = (j / 2 >> 0);
                const idxI = (i / 2 >> 0);
                const idxH = (h / 2 >> 0);
                const x = idxJ * (SPACE + THICKNESS);
                const y = idxH * (HEIGHT + THICKNESS);
                const z = idxI * (SPACE + THICKNESS);
                let geo, posX, posZ;
                if (h & 1) {
                    if (matrixData[h][i][j]) {
                        if (j & 1) {
                            posX = ((SPACE / 2) + THICKNESS) + x;
                            posZ = (THICKNESS / 2) + z;
                            geo = horizontalWallGeo
                        }
                        else if (i & 1) {
                            posX = (THICKNESS / 2) + x;
                            posZ = ((SPACE / 2) + THICKNESS) + z;
                            geo = verticalWallGeo
                        }
                        else {
                            posX = (THICKNESS / 2) + x;
                            posZ = (THICKNESS / 2) + z;
                            geo = pilarWallGeo
                        }
                        mazeBoxes[mazeBoxesIdx].push(
                            new Box3().setFromCenterAndSize(
                                new Vector3(posX, y + POS_Y, posZ),
                                new Vector3(...geo)
                            )
                        );
                    }
                }
                else {
                    if (matrixData[h][i][j] === 0) {
                        posX = ((SPACE / 2) + THICKNESS) + x;
                        posZ = ((SPACE / 2) + THICKNESS) + z;
                        liftBoxes.push(
                            new Box3().setFromCenterAndSize(
                                new Vector3(posX, y + FLOOR_INIT_Y, posZ),
                                new Vector3(...liftGeo)
                            )
                        )
                    }
                }
            }
        }
    }

    const maxX = mazeBoxes[0].at(-1).max.x
    const midX = Math.ceil(maxX / 2)
    const minZ = mazeBoxes[0][0].min.z
    const maxZ = mazeBoxes[0].at(-1).max.z

    const northSeparator = new Box3()
    northSeparator.min.set(midX - 1, -Infinity, -Infinity)
    northSeparator.max.set(midX + 1, Infinity, minZ)

    const southSeparator = new Box3()
    southSeparator.min.set(midX - 1, -Infinity, maxZ)
    southSeparator.max.set(midX + 1, Infinity, Infinity)

    mazeBoxes.unshift([northSeparator, southSeparator])

    return [
        {
            wall: mazeBoxes,
            lift: liftBoxes
        },
        maxX,
        maxZ
    ]

}