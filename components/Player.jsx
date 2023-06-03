import { PerspectiveCamera } from '@react-three/drei'

export function Player({ playerRef, cameraRef }) {

    const torusConst = [1, 0.5, 10, 50]

    // console.log('player rerender')

    return (
        <mesh ref={playerRef}>
            <torusGeometry args={torusConst} />
            <meshLambertMaterial color={0x4444ff} />
            <PerspectiveCamera makeDefault ref={cameraRef} near={5}/>
        </mesh>
    )
}
