/*
 * action types
 */

export const SET_USER = 'SET_USER'
export const BUY_TOKEN = 'BUY_TOKEN'
export const UPDATE_TOKEN_LIST = 'UPDATE_TOKEN_LIST'
export const SET_INDEX = 'SET_INDEX'

export const BLOCKCHAIN_EVENT = 'BLOCKCHAIN_EVENT'

/*
 * action creators
 */
export function setUser(address) {
  return {
    type: SET_USER,
    address
  }
}

export function buyToken(index, address) {
  return {
    type: BUY_TOKEN,
    index,
    address
  }
}

export function updateTokenList(tokens) {
  return {
    type: UPDATE_TOKEN_LIST,
    tokens
  }
}

export function setIndex(index) {
  return {
    type: SET_INDEX,
    index
  }
}
