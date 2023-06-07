import { useState } from "react";
import { Link } from "react-router-dom";
import { GraphicSettings } from "../components/GraphicSettings";
import { Starter } from "../components/Starter";
// import { useGameContext } from "../contexts/GameContext";

export function Menu() {

  return (
    <Starter>
      <div className='dialog-message'>
        <h2>How to Play</h2>
        <div>Start from entrance in the northwest and find the correct route to exit in the southeast</div>
        <div>Direct the donut orientation using virtual joystick on the right</div>
        <div>Move using arrow buttons on the left</div>
        <div>Click 'Play' to start!</div>
      </div>
      <GraphicSettings />
      <Link to="../play">
        <button className="dialog-btn big-txt">Play</button>
      </Link>
    </Starter>
  )
}