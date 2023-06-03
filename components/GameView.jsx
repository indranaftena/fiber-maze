import { Stats, Sky } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Player } from './Player'
import { useEffect, useRef, useState } from 'react'
import { Maze } from './Maze'
import { useRotate } from '../hooks/useRotate'
import { calculateMazeData } from '../utils/calculateMazeData'
import { Base } from './Base'
import { MiniMap } from './MiniMap'
import { Timer } from './Timer'
import { Control } from './Control'
import { TouchInput } from './TouchInput'
import { useGameContext } from '../contexts/GameContext'
// import { useNavigate } from 'react-router-dom'

export function GameView({ mazeMatrix, params }) {
  const isTouch = window.navigator.maxTouchPoints > 0
  const [move, setMove] = useState(() => {
    return (() => console.log('no setMove function'))
  })
  const [rotate, setRotate] = useState(() => {
    return (() => console.log('no setRotate function'))
  })

  // const navigate = useNavigate()
  const [isHold, setIsHold] = useState(true)

  const { timing, movePlayerRot, moveCameraPosYZ } = useGameContext()

  const playerRef = useRef(null)
  const cameraRef = useRef(null)

  const mouseControl = useRef(null)

  const liftRef = useRef([])
  const [liftFunc, setLiftFunc] = useState(() => {
    return (() => console.log('error'))
  })

  const mapRef = useRef(null)
  const mapEachRef = useRef([])

  useEffect(() => {
    mapEachRef.current = mapEachRef.current.slice(0, bBoxes.wall.length - 1)
    setMapFloor()
    timer(0)
  }, [])

  const mapHelperRef = useRef(null)
  const floorRef = useRef(1)
  const floorIdc = useRef(null)

  const timerRef = useRef(null)

  const changeOrientation = useRotate(playerRef, cameraRef, movePlayerRot, moveCameraPosYZ, mapRef, mapHelperRef)

  function lockChangeAlert() {
    if (document.pointerLockElement === mouseControl.current) {
      console.log('pointer is locked')
      document.addEventListener('mousemove', changeOrientation, false)
    }
    else {
      console.log('pointer is unlocked')
      document.removeEventListener('mousemove', changeOrientation, false)
    }
    setIsHold((prev) => !prev)
  }

  useEffect(() => {
    document.addEventListener('pointerlockchange', lockChangeAlert, false)
    return () => {
      document.removeEventListener('pointerlockchange', lockChangeAlert, false)
    }
  }, [lockChangeAlert])

  async function playGame() {
    if (!document.pointerLockElement) {
      try {
        await mouseControl.current.requestPointerLock({
          unadjustedMovement: true,
        })
      } catch (error) {
        if (error.name === 'NotSupportedError') {
          mouseControl.current.requestPointerLock()
        }
      }
    }
  }

  const mazeParams = params.maze
  const skyProps = params.sky

  const [bBoxes, mazeMaxX, mazeMaxZ] = calculateMazeData(mazeMatrix, mazeParams)
  // console.log(wallBoxes)

  function timer(delta) {
    timing.current += delta * 100

    const minutes = Math.floor((timing.current % 360000) / 6000)
    const seconds = Math.floor((timing.current % 6000) / 100)
    const miliSeconds = Math.round(timing.current % 100)

    timerRef.current.innerHTML = `${minutes}&nbsp;:&nbsp;${seconds}&nbsp;:&nbsp;${miliSeconds}`
  }

  function setMapFloor() {
    floorIdc.current.innerText = floorRef.current
    for (let i = 0; i < mapEachRef.current.length; i++) {
      if (i === floorRef.current - 1) mapEachRef.current[i].style.display = 'block'
      else mapEachRef.current[i].style.display = 'none'
    }
  }

  function handleArrow() {
    liftFunc()
    setMapFloor()
  }

  // console.log('gameView rerender')

  return (
    <>
      <div id='canvas-container' onClick={handleArrow}>
        <Canvas ref={mouseControl}>
          <ambientLight intensity={0.7} />
          <pointLight position={[10000, 1000, 10000]} intensity={0.9} />
          <pointLight position={[10000, 0, -10000]} intensity={0.4} />
          <Sky distance={4500} sunPosition={[50, -2, 50]} {...skyProps} />
          <Control isHold={isHold} moveSetter={setMove}
            bb={bBoxes} miniMap={mapRef} mapHelper={mapHelperRef} mapScale={mazeParams.map.SCALE}
            timer={timer} finishLine={mazeMaxX} maxZ={mazeMaxZ} liftArr={liftRef}
            setLiftFunc={setLiftFunc} floorRef={floorRef} isTouch={isTouch} setRotate={setRotate} >
            <Player playerRef={playerRef} cameraRef={cameraRef} />
          </Control>
          <Base size={[mazeMaxX, mazeMaxZ]} />
          <Maze matrixData={mazeMatrix} params={mazeParams} liftArr={liftRef} />
          <Stats />
        </Canvas>
      </div>
      <MiniMap mapRef={mapRef} bBoxes={bBoxes} mapScale={mazeParams.map.SCALE}
        mapEachRef={mapEachRef} mapHelperRef={mapHelperRef} floorIndex={floorIdc} />
      <Timer timerRef={timerRef} />
      <div id='crosshair'>+</div>
      {isTouch && <TouchInput moveSetter={move} setRotateRate={rotate}
        arrowFunc={handleArrow} />}
      {(isHold && !isTouch ) && <div id='starter'>
        <div onClick={playGame} id='play-button'>Play</div>
      </div>}
    </>
  )
}