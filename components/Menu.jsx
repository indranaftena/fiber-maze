import { Link } from "react-router-dom";
// import { useGameContext } from "../contexts/GameContext";

export function Menu() {

    // const { playerPos, playerRot, cameraPosYZ, timing } = useGameContext()

    // console.log(playerPos.current, playerRot.current, cameraPosYZ.current, timing.current)

    return (
        <div id="starter">
            <Link className="play-btn" to="../play">Play</Link>
        </div>
    )
}