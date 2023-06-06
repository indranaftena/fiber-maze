import { useState } from "react";
import { Link } from "react-router-dom";
import { useGraphicContext } from "../contexts/GraphicContext";
// import { useGameContext } from "../contexts/GameContext";

export function Menu() {

  const [activeTab, setActiveTab] = useState('tab1')
  const { dpr, setDpr } = useGraphicContext()

  function handleTab1() {
    setActiveTab('tab1')
  }
  function handleTab2() {
    setActiveTab('tab2')
  }

  // function handleDprChange()

  // const { playerPos, playerRot, cameraPosYZ, timing } = useGameContext()

  // console.log(playerPos.current, playerRot.current, cameraPosYZ.current, timing.current)

  return (
    <div id="starter" className="dialog-box">
      <ul className="nav">
        <li onTouchStart={handleTab1} className={activeTab === 'tab1' ? 'active' : ''}>Guidance</li>
        <li onTouchStart={handleTab2} className={activeTab === 'tab2' ? 'active' : ''}>Settings</li>
      </ul>
      {activeTab === 'tab1' &&
        <div className='dialog-message'>
          <h2>How to Play</h2>
          <div>Start from entrance in the northwest and find the correct route to exit in the southeast</div>
          <div>Direct the donut orientation using virtual joystick on the right</div>
          <div>Move using arrow buttons on the left</div>
          <div>Click 'Play' to start!</div>
        </div>
      }
      {activeTab === 'tab2' &&
        <div className="dialog-message">
          <h2>Graphics</h2>
          <label htmlFor="quality">Render Quality&emsp;{dpr}</label>
          <input value={dpr} onChange={e => setDpr(e.target.value)} id="quality" type="range"
            min="0.1" max="1" step="0.1" />
        </div>
      }
      <Link to="../play">
        <div className="dialog-btn big-txt">Play</div>
      </Link>
    </div>
  )
}