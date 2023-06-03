import { useCallback, useRef } from "react"

export function useRotate(playerRef, cameraRef, movePlayer, moveCamera, mapRef, mapHelperRef) {
    const angleZero = useRef(0)

    const objectOrientation = useCallback(function (e) {
        const maxAngle = (Math.PI / 2) - 0.2
        const minAngle = -(Math.PI / 5)
        const cameraD = 8

        angleZero.current -= e.movementY * 0.005

        if (angleZero.current > maxAngle) {
            angleZero.current = maxAngle
        }
        else if (angleZero.current < minAngle) {
            angleZero.current = minAngle
        }

        cameraRef.current.position.y = cameraD * Math.sin(angleZero.current)
        cameraRef.current.position.z = cameraD * Math.cos(angleZero.current)
        moveCamera(cameraRef.current.position.toArray().slice(1, 3))

        cameraRef.current.rotation.x = -Math.atan((cameraRef.current.position.y - 2) / cameraRef.current.position.z)

        playerRef.current.rotation.y -= e.movementX * 0.005
        if (playerRef.current.rotation.y > 2 * Math.PI) {
            playerRef.current.rotation.y -= 2 * Math.PI
        }
        else if (playerRef.current.rotation.y < -2 * Math.PI) {
            playerRef.current.rotation.y += 2 * Math.PI
        }

        movePlayer(playerRef.current.rotation.toArray())

        mapRef.current.style.rotate = `${playerRef.current.rotation.y}rad`
        mapHelperRef.current.style.rotate = `${playerRef.current.rotation.y}rad`

    }, [])

    return objectOrientation
}