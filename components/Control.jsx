import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTranslate } from '../hooks/useTranslate'
import { Box3, Vector3 } from 'three'
import { Vector2 } from 'three'
import { useTouchRotate } from '../hooks/useTouchRotate'
import { useGameContext } from '../contexts/GameContext'

/* check collisions with any wall */
function checkCollisions(object, ...bounders) {
    const allBounders = [].concat(...bounders)
    for (let i = 0; i < allBounders.length; i++) {
        if (object.intersectsBox(allBounders[i])) {
            return true;
        }
    }
    return false;
}

/* check if player is inside any lift */
function isInsideLift(object, bounders, lifts, currentLift) {
    const activatedLifts = []
    for (let i = 0; i < bounders.length; i++) {
        if (bounders[i].containsBox(object)) {
            activatedLifts.push(lifts[i])
        }
    }
    if (activatedLifts.length > 0) {
        for (let i = 0; i < currentLift.length; i++) {
            currentLift[i].visible = false
        }
        currentLift = activatedLifts
        for (let i = 0; i < currentLift.length; i++) {
            currentLift[i].visible = true
        }
    }
    else {
        for (let i = 0; i < currentLift.length; i++) {
            currentLift[i].visible = false
        }
        currentLift.length = 0
    }

    return currentLift
}

/* raycating */
function liftRaycaster(raycaster, parents, currentArrow, currentArrowZ) {
    // console.log(raycaster)
    const activeArrows = []
    for (let i = 0; i < parents.length; i++) {
        activeArrows.push(...parents[i].children)
    }
    const pointed = raycaster.intersectObjects(activeArrows)
    if (pointed.length > 0) {
        if (currentArrow) currentArrow.object.material.color.set(0xdddd00)
        currentArrow = pointed[pointed.length - 1]
        currentArrow.object.material.color.set(0xffff44)
        currentArrowZ = currentArrow.object.matrixWorld.elements[13]

    }
    else {
        if (currentArrow) {
            currentArrow.object.material.color.set(0xdddd00)
            currentArrow = null
            currentArrowZ = 0
        }
    }

    return [currentArrow, currentArrowZ]
}

export function Control({ children, isHold, moveSetter, bb, miniMap, mapHelper, mapScale,
    timer, finishLine, maxZ, liftArr, setLiftFunc, floorRef, isTouch, setRotate }) {

    const torusRef = children.props.playerRef
    const cameraRef = children.props.cameraRef

    const { playerPos, playerRot, cameraPosYZ } = useGameContext()

    const timerRun = useRef(false)
    const isWinning = useRef(false)
    const onLift = useRef([])
    const onArrow = useRef(null)
    const onArrowZ = useRef(0)

    const torusConst = [1, 0.5, 10, 50]

    const torusBoxSize = (torusConst[0] + torusConst[1])
    const playerBox = useRef(new Box3())

    const raycaster = useThree((state) => state.raycaster)
    const point = new Vector2(0, 0)

    function upDownLift() {
        if (torusRef.current.position.y < onArrowZ.current) {
            torusRef.current.position.y += 7
            playerBox.current.max.y += 7
            playerBox.current.min.y += 7
            floorRef.current++
        }
        else if (onArrowZ.current > 0) {
            torusRef.current.position.y -= 7
            playerBox.current.max.y -= 7
            playerBox.current.min.y -= 7
            floorRef.current--
        }
    }

    const [currentMove, setMove] = useTranslate()
    const [touchRotate, setRotateRate] = useTouchRotate(torusRef, cameraRef, cameraPosYZ, miniMap, mapHelper)

    useEffect(() => {
        if (!(cameraRef.current && torusRef.current)) return

        // torusRef.current.position.set(-20, torusConst[0] + torusConst[1], 6)
        torusRef.current.position.set(...playerPos.current)
        torusRef.current.rotation.set(...playerRot.current)
        playerBox.current.setFromCenterAndSize(
            torusRef.current.position,
            new Vector3(2 * torusBoxSize, 2 * torusBoxSize, 2 * torusBoxSize)
        )
        cameraRef.current.position.set(0, ...cameraPosYZ.current)
        cameraRef.current.rotation.x = -Math.atan((cameraRef.current.position.y - 2) / cameraRef.current.position.z)

        setLiftFunc(() => upDownLift)
        moveSetter(() => setMove)
        setRotate(() => setRotateRate)

    }, [])

    function playerMove(scaledDelta) {
        /* speed */
        const walkSpeed = 0.4 * scaledDelta;

        /* move playerBox in x axis */
        if (currentMove.onward) {
            playerBox.current.min.x -= walkSpeed * Math.sin(torusRef.current.rotation.y);
            playerBox.current.max.x -= walkSpeed * Math.sin(torusRef.current.rotation.y);
        }
        if (currentMove.back) {
            playerBox.current.min.x += walkSpeed * Math.sin(torusRef.current.rotation.y);
            playerBox.current.max.x += walkSpeed * Math.sin(torusRef.current.rotation.y);
        }
        if (currentMove.right) {
            playerBox.current.min.x += walkSpeed * Math.cos(torusRef.current.rotation.y);
            playerBox.current.max.x += walkSpeed * Math.cos(torusRef.current.rotation.y);
        }
        if (currentMove.left) {
            playerBox.current.min.x -= walkSpeed * Math.cos(torusRef.current.rotation.y);
            playerBox.current.max.x -= walkSpeed * Math.cos(torusRef.current.rotation.y);
        }

        /* test the playerBox and the walls */
        if (checkCollisions(playerBox.current, bb.wall[floorRef.current], bb.wall[0])) {
            playerBox.current.min.x = torusRef.current.position.x - torusBoxSize;
            playerBox.current.max.x = torusRef.current.position.x + torusBoxSize;
        }
        else {
            torusRef.current.position.x = playerBox.current.min.x + torusBoxSize;
            playerPos.current[0] = torusRef.current.position.x
        }

        /* move playerBox in z axis */
        if (currentMove.onward) {
            playerBox.current.min.z -= walkSpeed * Math.cos(torusRef.current.rotation.y);
            playerBox.current.max.z -= walkSpeed * Math.cos(torusRef.current.rotation.y);
        }
        if (currentMove.back) {
            playerBox.current.min.z += walkSpeed * Math.cos(torusRef.current.rotation.y);
            playerBox.current.max.z += walkSpeed * Math.cos(torusRef.current.rotation.y);
        }
        if (currentMove.right) {
            playerBox.current.min.z -= walkSpeed * Math.sin(torusRef.current.rotation.y);
            playerBox.current.max.z -= walkSpeed * Math.sin(torusRef.current.rotation.y);
        }
        if (currentMove.left) {
            playerBox.current.min.z += walkSpeed * Math.sin(torusRef.current.rotation.y);
            playerBox.current.max.z += walkSpeed * Math.sin(torusRef.current.rotation.y);
        }

        /* test the playerBox and the walls */
        if (checkCollisions(playerBox.current, bb.wall[floorRef.current], bb.wall[0])) {
            playerBox.current.min.z = torusRef.current.position.z - torusBoxSize;
            playerBox.current.max.z = torusRef.current.position.z + torusBoxSize;
        }
        else {
            torusRef.current.position.z = playerBox.current.min.z + torusBoxSize;
            playerPos.current[2] = torusRef.current.position.z
        }

        if (torusRef.current.position.x > finishLine) {
            isWinning.current = true;
        }
        if (torusRef.current.position.x > 0 && torusRef.current.position.z > 0 && torusRef.current.position.z < maxZ) {
            timerRun.current = true;
        }

    }

    useFrame((_, delta) => {
        if (!torusRef.current || (isHold && !isTouch)) {
            return
        }

        const scaledDelta = delta * 61
        
        playerMove(scaledDelta)
        miniMap.current.style.transform = `translate3d(${-torusRef.current.position.x * mapScale}px, ${-torusRef.current.position.z * mapScale}px, 0)`

        if (isTouch) {
            touchRotate(scaledDelta)
            playerRot.current = torusRef.current.rotation.toArray()
            cameraPosYZ.current = cameraRef.current.position.toArray().slice(1, 3)
        }

        /* test if any lift is activated */
        onLift.current = isInsideLift(playerBox.current, bb.lift, liftArr.current, onLift.current)
        raycaster.setFromCamera(point, cameraRef.current)
        const arrowProps = liftRaycaster(raycaster, onLift.current, onArrow.current, onArrowZ.current)
        onArrow.current = arrowProps[0]
        onArrowZ.current = arrowProps[1]

        if (timerRun.current && !isWinning.current) timer(delta)
    })

    // console.log('player rerender')

    return (
        [children]
    )
}