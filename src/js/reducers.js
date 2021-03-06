import { SET_USER, BUY_TOKEN, UPDATE_TOKEN_LIST, SET_INDEX } from './actions'
import spriteList from '../assets/_getSprites'

// token example: { name: 'Druid', price: 0.001, available: true, address: '0x1234' }

const initialState = {
  menu: [],
  spriteList,
  index: -1,
  user: null
}

export default function rootReducer(state={...initialState}, action) {
  return {
    //sets address for user
    [SET_USER]: {...state, ...{user: action.address}},

    //updates menu item with new owner address and switches "for sale" to false
    get [BUY_TOKEN]() {
      const preBins = state.menu.slice(0,action.index)
      const newBin = {...state.menu[action.index], ...{available: false, address: action.address}}
      const postBins = state.menu.slice(action.index + 1)
      return {...state, ...{menu: [...preBins, newBin, ...postBins]}}
    },

    //adds token to menu {name, address, available, price}
    [UPDATE_TOKEN_LIST]: {...state, ...{menu: action.tokens}},

    //changes scene/sprite index
    [SET_INDEX]: {...state, ...{index: action.index}},

  }[action.type] || state
}
