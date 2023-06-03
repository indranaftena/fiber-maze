import { Link } from "react-router-dom";

function Level({ path, text }) {
  return (
    <Link to={path}>
      <div className="level">{text}</div>
    </Link>
  )
}

export function Home() {
  const isTouch = window.navigator.maxTouchPoints > 0
  const link = isTouch ? 'menu' : 'play'

  return (
    <>
      <h1>Donut Maze</h1>
      <p className="center">New Version</p>

      <section className="menu">
        <Level path={`try-out/${link}`} text={'Try Out'} />
        <Level path={`level-one/${link}`} text={'Level 1'} />
        <Level path={`level-two/${link}`} text={'Level 2'} />
        <Level path={`level-three/${link}`} text={'Level 3'} />
        <Level path={`the-angle/${link}`} text={'The Angle'} />
        <Level path={`random/${link}`} text={'Random'} />
      </section>

      <footer>
        <div className="credit">
          <div>&copy; 2023 Indra 'Naftena' Kurniawan |&nbsp;</div>
          <div>All rights reserved</div>
        </div>
      </footer>
    </>
  )
}