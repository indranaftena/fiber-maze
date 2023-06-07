import { Route, Routes } from "react-router-dom";
import { InGameProvider } from "../contexts/GameContext";
import { GameView } from '../components/GameView'
import { Menu } from "./Menu";
import { MazeConstants, SkyConstant } from '../data/Constants'
import { mapTheAngle } from '../data/MazeMap'

export function TheAngle() {
  const params = {
    maze: new MazeConstants(),
    sky: new SkyConstant()
  }

  params.maze.floor.MAT = params.maze.wall.MAT

  return (
    <InGameProvider>
      <Routes>
        <Route path="play" element={<GameView mazeMatrix={mapTheAngle} params={params} />} />
        <Route path="menu" Component={Menu} />
      </Routes>
    </InGameProvider>
  )
}