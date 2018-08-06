import React from 'react'
//import Sprite from '../containers/Sprite'
import Scene from '../containers/Scene'
import Menu from '../containers/Menu'
import TokenListener from '../containers/TokenListener'

//<Sprite />
const App = () => [
  <section className="game-wrapper" key="section-0" >
    <Scene />
  </section>,
  <section className="menu-wrapper" key="section-1">
    <Menu />
    <TokenListener />
  </section>
]

export default App
