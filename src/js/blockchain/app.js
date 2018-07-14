// Import libraries we need.

import Web3 from 'web3'
import contract from 'truffle-contract'
import nfcb_artifacts from '../../../build/contracts/NFCB.json'

document.addEventListener('DOMContentLoaded', tokenContract)

async function tokenContract(){
  const NFCB = contract(nfcb_artifacts)
  initWeb3Provider(NFCB)
  await listenForEvents()

  let defaultAccount = web3.eth.defaultAccount = web3.eth.accounts[0]
  let message = {
    gas: 140000,
    from: defaultAccount
  }

  console.log(defaultAccount)

  window.msg = message
  window.inst = await NFCB.deployed()

  window.mint = mint
  window.buy = buy
  window.ownerOf = ownerOf
  window.modify = modify
  //return { mint, buy, ownerOf, modify }

  async function listenForEvents() {
    const instance = await NFCB.deployed()
    const cryptoBuddyEvent = instance.NewCryptoBuddy()
    cryptoBuddyEvent.watch((error, result) => {
      if(error) {
        console.warn('Mint Event Error')
      } else {
        console.info('Mint Event:', result)
      }
    })
  }

  async function mint(name, weiPrice, msg) {
    try {
      const instance = await NFCB.deployed()
      const ethPrice = web3.fromWei(weiPrice,'ether')
      const receipt = await instance.mint(name, ethPrice, msg)
      console.log(receipt)
    } catch (err) {
      console.warn('Minting Error')
    }
  }

  async function buy(key, msg) {
    try {
      const instance = await NFCB.deployed()
      return await instance.buy(key, msg)
    } catch(err) {
      console.warn('Buy Error')
    }
  }

  async function ownerOf(key) {
    try {
      const instance = await NFCB.deployed()
      const owner = await instance.ownerOf(key)
      console.info(owner)
    } catch (err) {
      console.warn('OwnerOf Error')
    }
  }

  async function modify(key, forSale, price, msg) {
    try {
      const instance = await NFCB.deployed()
      const receipt = await instance.modify(key, forSale, price, msg)
      console.log(receipt)
    } catch (err) {
      console.warn('Modify Error')
    }
  }
}

function initWeb3Provider(contract) {
  // If no injected web3 instance is detected, fall back to Ganache
  const web3Provider = (typeof web3 !== 'undefined') ? web3.currentProvider : new Web3.providers.HttpProvider('http://localhost:8545')
  contract.setProvider(web3Provider)
}
