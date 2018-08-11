import React from 'react'
import Address from '../containers/Address'

function getAddress(){
  try {
    const address = web3.eth.accounts[0]
    return address || <span style={{color:'red'}}>no address detected</span>
  } catch (err) {
    return err
  }
}

const Intro = () => <nav className='intro'>blockchain buddies market. user: <Address /></nav>

export default Intro

