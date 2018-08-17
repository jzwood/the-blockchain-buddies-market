import web3provider from './web3Provider'
import contract from 'truffle-contract'
import nfcb_artifacts from '../../../build/contracts/NFCB.json'
import { BLOCKCHAIN_EVENT } from '../actions'
import { range } from '../utils'

let NFCB

export function initTokenContract() {
  const provider = web3provider()
  NFCB = contract(nfcb_artifacts)
  NFCB.setProvider(provider)
}

export async function getTokens() {
  try {
    const instance = await NFCB.deployed()
    const buddies = []
    const parseBigNum = bigNum => parseInt(bigNum.toString(10),10)
    const numKeys = await instance.numKeys.call().then(parseBigNum)
    const getBuddy = async tokenNum => {
      const key = tokenNum - 1
      try {
        const buddy = await instance.tokenMap(key)
        let [name, price, available] = buddy
        name = web3.toAscii(name).replace(/\0/g, '')
        price = parseFloat(web3.fromWei(price), 10)
        const address = await instance.ownerOf(key)
        return {name, price, address, available}
      } catch (err) {
        console.warn(`No Token for key: ${key}`)
      }
    }
    return Promise.all(range(1,numKeys,1).map(getBuddy))
  } catch (err) {
    console.warn('GetTokens Error', err)
  }
}

export async function initEventEmitter() {
  try {
    const instance = await NFCB.deployed()
    console.log('NFCB successfully deployed:',instance)
    const createEvent = (error ='', result='') => new CustomEvent(BLOCKCHAIN_EVENT, { detail: { error, result }})
    document.dispatchEvent(createEvent())

    const cryptoBuddyEvents = instance.NewCryptoBuddy()
    cryptoBuddyEvents.watch((error, result) => {
      console.info(result)
      const tokenEvent = createEvent(result)
      document.dispatchEvent(tokenEvent)
    })
  } catch(err) {
    console.log('InitEventEmitter Error', err)
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

export async function buy(key, msg) {
  try {
    const instance = await NFCB.deployed()
    return await instance.buy(key, msg)
  } catch(err) {
    console.warn('Buy Error', err)
  }
}

export async function mint(name, eth, msg) {
  try {
    console.info(`Attempting to mint: ${name}, for ${eth} eth by ${JSON.stringify(msg)}`)
    const instance = await NFCB.deployed()
    const receipt = await instance.mint(name, eth, msg)
    console.log(receipt)
  } catch (err) {
    console.warn('Minting Error', err)
  }
}

export async function modify(key, forSale, price, msg) {
  try {
    const instance = await NFCB.deployed()
    const receipt = await instance.modify(key, forSale, price, msg)
    console.log(receipt)
  } catch (err) {
    console.warn('Modify Error', err)
  }
}
