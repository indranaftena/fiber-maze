import { Route, Routes } from "react-router-dom";
import { InGameProvider } from "../contexts/GameContext";
import { GameView } from '../components/GameView'
import { Menu } from "../components/Menu";
import { MazeConstants, SkyConstant } from '../data/Constants'
import { mapTwo } from '../data/MazeMap'

export function LevelTwo() {
  const params = {
    maze: new MazeConstants(),
    sky: new SkyConstant()
  }

  return (
    <InGameProvider>
      <Routes>
        <Route path="play" element={<GameView mazeMatrix={mapTwo} params={params} />} />
        <Route path="menu" Component={Menu} />
      </Routes>
    </InGameProvider>
  )
}