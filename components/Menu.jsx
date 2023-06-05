import { Link } from "react-router-dom";
// import { useGameContext } from "../contexts/GameContext";

export function Menu() {

  // const { playerPos, playerRot, cameraPosYZ, timing } = useGameContext()

  // console.log(playerPos.current, playerRot.current, cameraPosYZ.current, timing.current)

  return (
    <div id="starter" className="dialog-box">
      <div className='dialog-message'>
        <h1>How to Play</h1>
        <div>Start from entrance in the northeast and find the correct route to exit in the southwest</div>
        <p>Direct the donut orientation using virtual joystick on the right</p>
        <p>Move using arrow buttons on the left</p>
        <p>Click 'Play' to start!</p>
      </div>
      <Link to="../play">
        <div className="dialog-btn big-txt">Play</div>
      </Link>
    </div>
  )
}