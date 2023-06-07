import { useState } from "react"

export function Starter({ children }) {

  const [activeTab, setActiveTab] = useState('tab1')

  function handleTab1() {
    setActiveTab('tab1')
  }
  function handleTab2() {
    setActiveTab('tab2')
  }

  return (
    <div id="starter" className="dialog-box">
      <ul className="nav">
        <li><button onTouchStart={handleTab1} onClick={handleTab1}
          className={activeTab === 'tab1' ? 'active' : ''}>Guidance</button></li>
        <li><button onTouchStart={handleTab2} onClick={handleTab2}
          className={activeTab === 'tab2' ? 'active' : ''}>Settings</button></li>
      </ul>
      {activeTab === 'tab1' && children[0]}
      {activeTab === 'tab2' && children[1]}
      {children.at(-1)}
    </div>
  )
}