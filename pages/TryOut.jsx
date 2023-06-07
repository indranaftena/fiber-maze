import { Route, Routes } from "react-router-dom";
import { InGameProvider } from "../contexts/GameContext";
import { GameView } from "../components/GameView";
import { Menu } from "./Menu";
import { MazeConstants, SkyConstant } from "../data/Constants";
import { mapTryOut } from "../data/MazeMap";

export function TryOut() {
  const params = {
    maze: new MazeConstants(),
    sky: new SkyConstant()
  }

  return (
    <InGameProvider>
      <Routes>
        <Route path="play" element={<GameView mazeMatrix={mapTryOut} params={params} />} />
        <Route path="menu" Component={Menu} />
      </Routes>
    </InGameProvider>
  )
}