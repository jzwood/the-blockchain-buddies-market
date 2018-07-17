import React from 'react'
import { render } from 'react-dom'
import { newAnimation } from './animation'

import { tokenContract } from './blockchain/contract'

import * as sprite from './sprite'

let animation, active
let contract

function getImage(image) {
  return image ? <img src={image} width="128" height="128"/> : '�'
}

function nfs(name){
  return name ? <span className="nosale">not for sale</span> : 'no data'
}

function buyChar({name, key}) {
  console.info(name, key)
}

async function clickOnChar({name, price, available, image, key}) {
  console.log(name, price, available, image, key)
  active && sprite.unmount(key)
  animation.update[0] = active = await sprite.render(image, key)
}

export async function renderCharBoxes(characters) {
  animation = newAnimation()
  contract = await tokenContract()
  window.contract = contract
  //window.contract = contract
  //const address = await contract.ownerOf(0)
  let address = '0x213123124'

  const menuWrapper = document.querySelector('.menu-wrapper')
  render(<Bins buddies={characters}/>, menuWrapper)
}

function Bins({buddies}) {
  return (
    <article className='menu'>
      {buddies.map((props, key) => BuddyBin(Object.assign(props, {key})))}
    </article>
  )
}

function BuddyBin({name, price, available, image, key}) {
  let address = '0x213123124'
  return (
    <article className='character-wrapper' key={`character-${key}`}>
      <figure className='image-box' onClick={e => clickOnChar({name, price, available, image, key})}>{getImage(image)}</figure>
      <ul className='copy'>
        <li className='pricetag'>{available ? <button className='buy-button' onClick={e => buyChar({name, key})}>Ξ{price}</button> : nfs(name)}</li>
        <li className='name'>{name}</li>
        <li className='owner' title={address}>{address}</li>
      </ul>
    </article>
  )
}
