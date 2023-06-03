import { Route, Routes } from 'react-router-dom'
import { InGameProvider } from '../contexts/GameContext'
import { GameView } from '../components/GameView'
import { Menu } from '../components/Menu'
import { MazeConstants, SkyConstant } from '../data/Constants'
import { mapOne } from '../data/MazeMap'

export function LevelOne() {
  const params = {
    maze: new MazeConstants(),
    sky: new SkyConstant()
  }

  return (
    <InGameProvider>
      <Routes>
        <Route path="play" element={<GameView mazeMatrix={mapOne} params={params} />} />
        <Route path="menu" Component={Menu} />
      </Routes>
    </InGameProvider>
  )
}