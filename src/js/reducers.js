import { LOAD_SCENE, ADD_SPRITE, BUY_TOKEN, REMOVE_ALL_SPRITES, ADD_MENUBOX } from './actions'

const initialState = {menu: [{name: 'test', price: 100, available: true, address: '0x1234'}]}

export default function rootReducer(state={...initialState}, action) {
  return {
    [LOAD_SCENE]: {...state, ...{scene: action.index}},
    get [BUY_TOKEN]() {
      const newBin = {...state.menu[action.index], ...{available: false, address: action.address}}
      console.log(state.menu, action.index, newBin)
      return {...state, ...{menu: [...state.menu.slice(0,action.index), newBin, ...state.menu.slice(action.index + 1)]}}
    },
    [ADD_SPRITE]: {...state, ...{sprite: action.index}},
    [REMOVE_ALL_SPRITES]: {...state, ...{sprite: action.index}},
    [ADD_MENUBOX]: {...state, ...{menu: [...state.menu, action.attributes]}},
  }[action.type] || state
}
