import { forwardRef } from "react"

function MazeBox({ pos, geo, mat }) {
  return (
    <mesh position={pos}>
      <boxGeometry args={geo} />
      {mat}
    </mesh>
  )
}

const Lift = forwardRef(function Lift({ pos, geo, mat }, ref) {
  const arrowGeo = [2, 1, 0.6, 4]
  const arrowOnePos = (geo[2] / 2) - arrowGeo[2]
  const arrowTwoPos = -arrowOnePos

  return (
    <mesh position={pos} visible={false} ref={ref}>
      <boxGeometry args={geo} />
      {mat.LIFT_MAT}
      <mesh position={[0, 0, arrowOnePos]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={arrowGeo} />
        {mat.ARROW_MAT}
      </mesh>
      <mesh position={[0, 0, arrowTwoPos]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={arrowGeo} />
        {mat.ARROW_MAT}
      </mesh>
    </mesh>
  )

})

export function Maze({ matrixData, params, liftArr }) {

  /* some constants */
  const HEIGHT = params.wall.HEIGHT
  const THICKNESS = params.wall.THICKNESS
  const SPACE = params.wall.SPACE
  const POS_Y = (HEIGHT / 2)
  const FLOOR_INIT_Y = (-THICKNESS / 2)

  /* material */
  const wallMat = params.wall.MAT
  const floorMat = params.floor.MAT
  const liftArrowMat = params.lift

  /* geometry */
  // wall
  const pilarWallGeo = [THICKNESS, HEIGHT, THICKNESS]
  const horizontalWallGeo = [SPACE, HEIGHT, THICKNESS]
  const verticalWallGeo = [THICKNESS, HEIGHT, SPACE]
  // floor
  const horizontalFloorGeo = [SPACE, THICKNESS, THICKNESS]
  const verticalFloorGeo = [THICKNESS, THICKNESS, SPACE]
  const smallSqrFloorGeo = [THICKNESS, THICKNESS, THICKNESS]
  const bigSqrFloorGeo = [SPACE, THICKNESS, SPACE]
  // lift
  const liftGeo = [SPACE, 2 * (HEIGHT + THICKNESS), SPACE]

  let counter = -1

  // console.log('maze rerender')

  return (
    matrixData.map((level, h) => {
      return (
        level.map((vertical, i) => {
          return (
            vertical.map((element, j) => {
              const idxJ = (j / 2 >> 0);
              const idxI = (i / 2 >> 0);
              const idxH = (h / 2 >> 0);
              const x = idxJ * (SPACE + THICKNESS);
              const y = idxH * (HEIGHT + THICKNESS);
              const z = idxI * (SPACE + THICKNESS);
              let posX, posZ, geo;
              if (h & 1) {
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
                if (element === 1) {
                  return (
                    <MazeBox pos={[posX, y + POS_Y, posZ]} geo={geo} mat={wallMat}
                      key={h.toString() + '_' + i.toString() + '_' + j.toString()} />
                  )
                }
              }
              else if (h > 0) {
                if (element === 1) {
                  if ((i & 1) && (j & 1)) {
                    posX = ((SPACE / 2) + THICKNESS) + x;
                    posZ = ((SPACE / 2) + THICKNESS) + z;
                    geo = bigSqrFloorGeo
                  }
                  else if (j & 1) {
                    posX = ((SPACE / 2) + THICKNESS) + x;
                    posZ = (THICKNESS / 2) + z;
                    geo = horizontalFloorGeo
                  }
                  else if (i & 1) {
                    posX = (THICKNESS / 2) + x;
                    posZ = ((SPACE / 2) + THICKNESS) + z;
                    geo = verticalFloorGeo
                  }
                  else {
                    posX = (THICKNESS / 2) + x;
                    posZ = (THICKNESS / 2) + z;
                    geo = smallSqrFloorGeo
                  }
                  return (
                    <MazeBox pos={[posX, y + FLOOR_INIT_Y, posZ]} geo={geo} mat={floorMat}
                      key={h.toString() + '_' + i.toString() + '_' + j.toString()} />
                  )
                }
                else if (element === 0) {
                  posX = ((SPACE / 2) + THICKNESS) + x;
                  posZ = ((SPACE / 2) + THICKNESS) + z;
                  counter++
                  return (
                    <Lift pos={[posX, y + FLOOR_INIT_Y, posZ]} geo={liftGeo} mat={liftArrowMat}
                      key={h.toString() + '_' + i.toString() + '_' + j.toString()}
                      ref={temp => liftArr.current.push(temp)} />
                  )
                }
              }
            })
          )
        })
      )
    })
  )
}