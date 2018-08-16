import React from 'react'
import PropTypes from 'prop-types'
import Bin from './Bin'

const MenuBins = ({ buddies, address, onSelect, onBuy}) => (
  <article className='menu'>
    {buddies.map((props, key) => (
      <Bin
        key={`bin-${key}`}
        {...props}
        onSelect={() => onSelect(key)}
        onBuy={() => onBuy(key, address)}
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
  onSelect: PropTypes.func,
  onBuy: PropTypes.func
}

export default MenuBins
