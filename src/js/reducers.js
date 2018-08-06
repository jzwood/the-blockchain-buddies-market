import { SET_USER, BUY_TOKEN, ADD_TOKEN, LOAD_SCENE, SET_SPRITE } from './actions'
import spriteList from '../assets/_getSprites'

// token example: { name: 'Druid', price: 0.001, available: true, address: '0x1234' }

const initialState = {
  menu: [],
  spriteList,
  sprite: null,
  scene: -1,
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
    get [ADD_TOKEN]() {
      const menu = [...state.menu, action.attributes]
      const isNew = !state.menu.find(token => token.name === action.attributes.name)
      return isNew ? {...state, menu} : state
    },

    //changes scene index
    [LOAD_SCENE]: {...state, ...{scene: action.index}},

    //adds sprite to scene if sprite it exists
    [SET_SPRITE]: {...state, ...{sprite: action.index}},

  }[action.type] || state
}
