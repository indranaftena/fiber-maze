import { useCallback, useRef, useState } from "react";

export function useTouchRotate(playerRef, cameraRef, cameraPosYZ, mapRef, mapHelperRef) {
    const [rotateRate, setRotateRate] = useState({
        xRate: 0,
        yRate: 0
    })

    const angleZero = useRef(Math.atan2(...cameraPosYZ.current))

    const objectOrientation = useCallback(function (scaledDelta) {
        const maxAngle = (Math.PI / 2) - 0.2
        const minAngle = -(Math.PI / 5)
        const cameraD = 8

        angleZero.current += rotateRate.yRate * 0.001 * scaledDelta

        if (angleZero.current > maxAngle) {
            angleZero.current = maxAngle
        }
        else if (angleZero.current < minAngle) {
            angleZero.current = minAngle
        }

        cameraRef.current.position.y = cameraD * Math.sin(angleZero.current)
        cameraRef.current.position.z = cameraD * Math.cos(angleZero.current)

        cameraRef.current.rotation.x = -Math.atan((cameraRef.current.position.y - 2) / cameraRef.current.position.z)

        playerRef.current.rotation.y -= rotateRate.xRate * 0.002 * scaledDelta
        if (playerRef.current.rotation.y > 2 * Math.PI) {
            playerRef.current.rotation.y -= 2 * Math.PI
        }
        else if (playerRef.current.rotation.y < -2 * Math.PI) {
            playerRef.current.rotation.y += 2 * Math.PI
        }

        mapRef.current.style.rotate = `${playerRef.current.rotation.y}rad`
        mapHelperRef.current.style.rotate = `${playerRef.current.rotation.y}rad`
    })

    return [objectOrientation, setRotateRate]
}