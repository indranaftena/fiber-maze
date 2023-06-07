import { Route, Routes } from "react-router-dom";
import { InGameProvider } from "../contexts/GameContext";
import { GameView } from '../components/GameView'
import { Menu } from "./Menu";
import { MazeConstants, SkyConstant } from '../data/Constants'
import { MazeGenerator } from '../utils/randomMazeGenerator'
import { useRef } from "react";

export function Random() {
  const params = {
    maze: new MazeConstants(),
    sky: new SkyConstant()
  }

  const mazeGen = new MazeGenerator(1, 20, 20, [1, 1, 1])
  mazeGen.generateMaze()
  const mazeMatrix = useRef(mazeGen.mazeMatrix)

  // console.log('parent game link rerender')

  return (
    <InGameProvider>
      <Routes>
        <Route path="play" element={<GameView mazeMatrix={mazeMatrix.current} params={params} />} />
        <Route path="menu" Component={Menu} />
      </Routes>
    </InGameProvider>
  )
}