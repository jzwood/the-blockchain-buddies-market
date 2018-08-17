import React from 'react'
import Sprite from '../containers/Sprite'
import Intro from './Intro'
import Scene from '../containers/Scene'
import Menu from '../containers/Menu'
import Daemons from '../daemons/Daemons'

//<Sprite />
const App = () => [
  <Intro key="intro"/>,
  <section className="game-wrapper" key="game" >
    <Sprite />
    <Scene />
  </section>,
  <section className="menu-wrapper" key="menu">
    <Menu />
    <Daemons />
  </section>
]

export default App
