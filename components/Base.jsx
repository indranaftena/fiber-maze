// import { useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
// import { BackSide, FogExp2 } from "three"

export function Base({ size }) {

  const yardDistance = 1000
  const [x, z] = size
  const lengthX = x + yardDistance
  const lengthZ = z + yardDistance
  const radius = Math.max(x, z) + yardDistance

  // const scene = useThree((state) => state.scene)
  // scene.fog = new FogExp2(0xffffff, 0.002)

  const base = useRef()
  useEffect(() => {
    if (!base.current) return

    base.current.rotation.x = -Math.PI / 2
    base.current.position.set(x / 2, 0, z / 2)
  }, [])

  return (
    <>
      <mesh ref={base}>
        {/* <planeGeometry args={[lengthX, lengthZ]} /> */}
        <circleGeometry args={[radius, 100]} />
        <meshLambertMaterial color={0x444444} />
      </mesh>
    </>
  )
}