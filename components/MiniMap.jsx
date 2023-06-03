import { forwardRef, useEffect, useRef } from "react"

const EachMiniMap = forwardRef(function MiniMap({ mazeArray, mapScale }, ref) {
  const mapRef = useRef(null)

  useEffect(() => {
    const map = mapRef.current
    const { x: width, z: height } = mazeArray.at(-1).max
    map.width = width * mapScale
    map.height = height * mapScale


    const context = map.getContext('2d')
    context.fillStyle = "rgba(0, 255, 64, 0.6)";


    for (let i = 0; i < mazeArray.length; i++) {
      const { x: startX, z: startZ } = mazeArray[i].min
      const { x: endX, z: endZ } = mazeArray[i].max
      const [lenX, lenZ] = [endX - startX, endZ - startZ]
      context.fillRect(startX * mapScale, startZ * mapScale, lenX * mapScale, lenZ * mapScale)
    }

  }, [])


  return (
    <div ref={ref}>
      <canvas ref={mapRef} />
    </div>
  )
})

export function MiniMap({ mapRef, bBoxes, mapScale, mapEachRef, mapHelperRef, floorIndex }) {

  return (

    <div id='map-padding'>
      <div id='map-circle'>
        <div id='map' ref={mapRef}>
          {bBoxes.wall.slice(1).map((story, i) => {
            return (
              <EachMiniMap mazeArray={story} mapScale={mapScale} key={i}
                ref={temp => mapEachRef.current[i] = temp} />
            )
          })}
        </div>
        <img src='/map_helper.svg' alt='map-helper' ref={mapHelperRef} id='map-helper' />
      </div>
      <div id='floor-number' ref={floorIndex}>1</div>
    </div>

  )
}