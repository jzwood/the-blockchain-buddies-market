import Web3 from 'web3'
import contract from 'truffle-contract'
import nfcb_artifacts from '../../../build/contracts/NFCB.json'

export function tokenContract(){
  const NFCB = contract(nfcb_artifacts)
  initWeb3Provider(NFCB)

  let defaultAccount = web3.eth.defaultAccount = web3.eth.accounts[0]
  let message = {
    gas: 140000,
    from: defaultAccount
  }
  console.log(message)

  return { mint, buy, ownerOf, modify, initEventEmitter }

  async function initEventEmitter() {
    const instance = await NFCB.deployed()
    const cryptoBuddyEvent = instance.NewCryptoBuddy()
    cryptoBuddyEvent.watch((error, result) => {
      new CustomEvent('blockchain', { detail: { error, result }})
    })
  }

  async function mint(name, weiPrice, msg=message) {
    try {
      console.info(`Attempting to mint: ${name}, for ${weiPrice} wei by ${JSON.stringify(msg)}`)
      const instance = await NFCB.deployed()
      const ethPrice = web3.fromWei(weiPrice,'ether')
      const receipt = await instance.mint(name, ethPrice, msg)
      console.log(receipt)
    } catch (err) {
      console.warn('Minting Error', err)
    }
  }

  async function buy(key, msg) {
    try {
      const instance = await NFCB.deployed()
      return await instance.buy(key, msg)
    } catch(err) {
      console.warn('Buy Error', err)
    }
  }

  async function ownerOf(key) {
    try {
      const instance = await NFCB.deployed()
      const owner = await instance.ownerOf(key)
      console.info(owner)
    } catch (err) {
      console.warn('OwnerOf Error',err)
    }
  }

  async function modify(key, forSale, price, msg) {
    try {
      const instance = await NFCB.deployed()
      const receipt = await instance.modify(key, forSale, price, msg)
      console.log(receipt)
    } catch (err) {
      console.warn('Modify Error', err)
    }
  }
}

function initWeb3Provider(contract) {
  // If no injected web3 instance is detected, fall back to Ganache
  const web3Provider = (typeof web3 !== 'undefined') ? web3.currentProvider : new Web3.providers.HttpProvider('http://localhost:8545')
  contract.setProvider(web3Provider)
}
