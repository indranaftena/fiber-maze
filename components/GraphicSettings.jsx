import { useGraphicContext } from "../contexts/GraphicContext";

export function GraphicSettings() {
  const { dpr, setDpr, antialias, setAntialias } = useGraphicContext()

  return (
    <div className="dialog-message">
      <h2>Graphics</h2>
      <label htmlFor="quality">Render Quality&emsp;{dpr}</label>
      <input value={dpr} onChange={e => setDpr(e.target.value)} id="quality" type="range"
        min="0.1" max="1" step="0.1" />
      <label>Antialiasing
        <input checked={antialias} onChange={e => setAntialias(prev => !prev)} type="checkbox" />
        <span></span>
      </label>
    </div>
  )
}