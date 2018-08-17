import React from 'react'
import PropTypes from 'prop-types'
import Bin from './Bin'
import { buy } from '../blockchain/contract'

function attempTokenPurchase(key, address) {
  return async () => {
    try {
    // gas 1000000
      await buy(key, {gas: '140000', from: address})
    } catch(err) {
      console.warn(`Purchase of token: ${key} failed.`, err)
    }
  }
}

const MenuBins = ({ buddies, address, onSelect, onBuy}) => (
  <article className='menu'>
    {buddies.map((props, key) => (
      <Bin
        key={`bin-${key}`}
        {...props}
        onSelect={() => onSelect(key)}
        onBuy={attempTokenPurchase(key, address)}
      />
    ))}
  </article>
)

MenuBins.propTypes = {
  buddies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    available: PropTypes.bool.isRequired,
    address: PropTypes.string.isRequired,
    image: PropTypes.string,
    onSelect: PropTypes.func,
    onBuy: PropTypes.func,
  }).isRequired).isRequired,
  address: PropTypes.string,
  onSelect: PropTypes.func,
  onBuy: PropTypes.func
}

export default MenuBins
