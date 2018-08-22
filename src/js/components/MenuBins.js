import React from 'react'
import PropTypes from 'prop-types'
import Bin from './Bin'
import { buy } from '../blockchain/contract'

//NFCB.deployed().then(inst => inst.mint("kitty",web3.toWei(0.000054), {from:"0xeeb426d660ea6a7e5fc12f7e4b7902679dc38b58", gas: 140000}))

function attempTokenPurchase(key, address, token) {
  return async () => {
    try {
    // gas 1000000
      return await buy(key, {gas: 140000, from: address, value: web3.toWei(token.price)})
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
        onBuy={attempTokenPurchase(key, address, buddies[key])}
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
