/*
 * action types
 */

export const SET_USER = 'SET_USER'
export const BUY_TOKEN = 'BUY_TOKEN'
export const ADD_TOKEN = 'ADD_TOKEN'
export const LOAD_SCENE = 'LOAD_SCENE'
export const SET_SPRITE = 'SET_SPRITE'

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

export function loadScene(index) {
  return {
    type: LOAD_SCENE,
    index
  }
}

export function setSprite(index) {
  return {
    type: SET_SPRITE,
    index
  }
}
