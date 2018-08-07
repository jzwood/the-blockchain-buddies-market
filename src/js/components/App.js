import React from 'react'
import Sprite from '../containers/Sprite'
import Scene from '../containers/Scene'
import Menu from '../containers/Menu'
import TokenListener from '../containers/TokenListener'

//<Sprite />
const App = () => [
  <section className="game-wrapper" key="game" >
    <Sprite />
    <Scene />
  </section>,
  <section className="menu-wrapper" key="menu">
    <Menu />
    <TokenListener />
  </section>
]

export default App
