import React from 'react'
import { render } from 'react-dom'
import { newAnimation } from './animation'

import * as sprite from './sprite'

let animation, active

function getImage(image) {
  return image ? <img src={image} width="128" height="128"/> : '�'
}

function nfs(name){
  return name ? <span className="nosale">not for sale</span> : 'no data'
}


function buyChar({name, key}) {
  console.info(name, key)
}

async function clickOnChar({name, price, available, image}, i) {
  console.log(name, price, available, image, i)
  active && sprite.unmount(i)
  animation.update[0] = active = await sprite.render(image, i)
}

export async function renderCharBoxes(characters) {
  animation = newAnimation()

  const menuWrapper = document.querySelector('.menu')
  const CharBoxes = characters.map(({name, price, available, image},i) => (
    <div className='character-wrapper' key={`character-${i}`}>
      <div className='image-box' onClick={e => clickOnChar({name, price, available, image}, i)}>{getImage(image)}</div>
      <div className='copy'>
        <div className='pricetag'>{available ? <button onClick={e => buyChar({name, key: i})}>Ξ{price}</button> : nfs(name)}</div>
        <div className='name'>{name}</div>
      </div>
    </div>)
  )
  render(CharBoxes, menuWrapper)
}
