/*
 * action types
 */

export const SET_USER = 'SET_USER'
export const BUY_TOKEN = 'BUY_TOKEN'
export const ADD_TOKEN = 'ADD_TOKEN'
export const SET_INDEX = 'SET_INDEX'

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

export function addToken(attributes) {
  return {
    type: ADD_TOKEN,
    attributes
  }
}

export function setIndex(index) {
  return {
    type: SET_INDEX,
    index
  }
}
