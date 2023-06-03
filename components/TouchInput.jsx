import { useEffect, useRef, useState } from "react"

export function TouchInput({ moveSetter, setRotateRate, arrowFunc }) {

  class JoystickInput {
    constructor(stickRef, maxDistance, dZoneX, dZoneY, setRotateFunc) {
      const stick = stickRef.current
      this.dragStart = null
      this.touchId = null
      this.active = false

      this.maxDistance = maxDistance
      this.dZoneX = dZoneX
      this.dZoneY = dZoneY
      this.setRotateFunc = setRotateFunc

      this.handleStart = this.handleStart.bind(this)
      this.handleMove = this.handleMove.bind(this)
      this.handleEnd = this.handleEnd.bind(this)
    }

    handleStart(e) {
      this.active = true
      stick.style.transition = '0s'

      this.dragStart = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }
      this.touchId = e.changedTouches[0].identifier
    }

    handleMove(e) {
      if (!this.active) return

      let touchMoveId = null

      for (let i = 0; i < e.changedTouches.length; i++) {
        if (this.touchId === e.changedTouches[i].identifier) {
          touchMoveId = i
        }
      }

      if (touchMoveId === null) return

      const xDiff = e.changedTouches[touchMoveId].clientX - this.dragStart.x
      const yDiff = e.changedTouches[touchMoveId].clientY - this.dragStart.y
      const angle = Math.atan2(yDiff, xDiff)
      const distance = Math.min(this.maxDistance, Math.hypot(xDiff, yDiff))
      const xPos = distance * Math.cos(angle)
      const yPos = distance * Math.sin(angle)

      // console.log('touch move', xPos, yPos)

      stick.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`

      // deadzone adjustment
      let newXPos, newYPos

      if (xPos < this.dZoneX && xPos > -this.dZoneX) newXPos = 0
      else newXPos = xPos - (this.dZoneX * Math.sign(xPos))

      if (yPos < this.dZoneY && yPos > -this.dZoneY) newYPos = 0
      else newYPos = yPos - (this.dZoneY * Math.sign(yPos))

      // rotate player
      this.setRotateFunc({
        xRate: newXPos,
        yRate: newYPos
      })

    }

    handleEnd(e) {
      if (!this.active) return
      if (this.touchId !== e.changedTouches[0].identifier) return
      stick.style.transition = '.2s'
      stick.style.transform = 'translate3d(0, 0, 0)'

      this.touchId = null
      this.active = false

      this.setRotateFunc({
        xRate: 0,
        yRate: 0
      })
    }
  }


  const stickRef = useRef(null)
  const [stickController, setStickController] = useState(new JoystickInput(stickRef, 40, 20, 20, setRotateRate))

  useEffect(() => {
    setStickController((prev) => {
      prev.setRotateFunc = setRotateRate
      return prev
    })
  }, [setRotateRate])

  function goOnward(e) {
    moveSetter((prev) => { return ({ ...prev, onward: true }) })
  }

  function stopOnward(e) {
    moveSetter((prev) => { return ({ ...prev, onward: false }) })
  }

  function goRight(e) {
    moveSetter((prev) => { return ({ ...prev, right: true }) })
  }

  function stopRight(e) {
    moveSetter((prev) => { return ({ ...prev, right: false }) })
  }

  function goBack(e) {
    moveSetter((prev) => { return ({ ...prev, back: true }) })
  }

  function stopBack(e) {
    moveSetter((prev) => { return ({ ...prev, back: false }) })
  }

  function goLeft(e) {
    moveSetter((prev) => { return ({ ...prev, left: true }) })
  }

  function stopLeft(e) {
    moveSetter((prev) => { return ({ ...prev, left: false }) })
  }

  return (
    <>
      <div id="touch-control" onTouchMove={stickController.handleMove}
        onTouchEnd={stickController.handleEnd} onTouchCancel={stickController.handleEnd} >
        <div id="tc-translate" className="tc-area">
          <div onTouchStart={goOnward} onTouchEnd={stopOnward}
            onTouchCancel={stopOnward} id="up" className="tc-btn"></div>
          <div onTouchStart={goRight} onTouchEnd={stopRight}
            onTouchCancel={stopRight} id="right" className="tc-btn"></div>
          <div onTouchStart={goBack} onTouchEnd={stopBack}
            onTouchCancel={stopBack} id="down" className="tc-btn"></div>
          <div onTouchStart={goLeft} onTouchEnd={stopLeft}
            onTouchCancel={stopLeft} id="left" className="tc-btn"></div>
          <div onTouchStart={arrowFunc} id="arrow-tab" className="tc-btn"></div>
        </div>
        <div id="joystick" className="tc-area">
          <div ref={stickRef} id="stick" onTouchStart={stickController.handleStart}></div>
        </div>
      </div>
      {/* <div onTouchStart={pauseFunc} id="pause-btn" className="tc-btn">Pause</div> */}
    </>
  )
}