import React from 'react'
//import Scene from '../containers/Scene'
//import Sprite from '../containers/Sprite'
import Menu from '../containers/Menu'
import TokenListener from '../containers/TokenListener'

//<Sprite />
//<Scene />
const App = () => [
  <section className="game-wrapper" key="section-0" />,
  <section className="menu-wrapper" key="section-1">
    <Menu />
    <TokenListener />
  </section>
]

export default App
