import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import { LevelTwo } from '../pages/LevelTwo'
import { Random } from '../pages/Random'
import { LevelThree } from '../pages/LevelThree'
import { TryOut } from '../pages/TryOut'
import { LevelOne } from '../pages/LevelOne'
import { TheAngle } from '../pages/TheAngle'
import { GraphicProvider } from '../contexts/GraphicContext'

function App() {

  return (
    <>
      <BrowserRouter>
        <GraphicProvider>
          <Routes>
            <Route path='/' Component={Home} />
            <Route path='/try-out/*' Component={TryOut} />
            <Route path='/level-one/*' Component={LevelOne} />
            <Route path='/level-two/*' Component={LevelTwo} />
            <Route path='/level-three/*' Component={LevelThree} />
            <Route path='/the-angle/*' Component={TheAngle} />
            <Route path='/random/*' Component={Random} />
          </Routes>
        </GraphicProvider>
      </BrowserRouter>
    </>
  )
}

export default App
