import React from 'react'
import PropTypes from 'prop-types'
import { buy, ownerOf } from '../blockchain/contract'

const getImage = ({image}) => image ? <img src={image} width="128" height="128"/> : '�'
const parsePrice = ({name, price, available, address, onBuy}) => {
  if (available) {
    return <button className='buy-button' onClick={onBuy}>Ξ{price}</button>
  }

  if (name) {
    return <i className="nosale">bought</i>
  }

  return 'no data'
}

const Bin = props => (
  <article className='character-wrapper'>
    <figure className='image-box' onClick={props.onSelect}>{getImage(props)}</figure>
    <ul className='copy'>
      <li className='pricetag'>{parsePrice(props)}</li>
      <li className='name'>{props.name}</li>
      <li className='owner' style={{backgroundColor: 'white'}} title={props.address}>{props.address}</li>
    </ul>
  </article>
)

getImage.propTypes = {
  image: PropTypes.string
}

// type checking
Bin.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  available: PropTypes.bool,
  address: PropTypes.string,
  image: PropTypes.string,
  onSelect: PropTypes.func,
  onBuy: PropTypes.func,
}

// simply a component that needs a bunch of data to render
export default Bin
