import { LOAD_SCENE, ADD_SPRITE, BUY_SPRITE, REMOVE_ALL_SPRITES, ADD_MENUBOX } from './actions'

const initialState = {menu: [{name: 'hi', price: 100, available: false, address: '0x1234'}]}

export default function rootReducer(state={...initialState}, action) {
  return {
    [LOAD_SCENE]: {...state, ...{scene: action.index}},
    [BUY_SPRITE] : {...state, ...{menu: [...state.menu.slice(0,action.index), action.attributes, ...[state.menu.slice(action.index + 1)]]}},
    [ADD_SPRITE]: {...state, ...{sprite: action.index}},
    [REMOVE_ALL_SPRITES]: {...state, ...{sprite: action.index}},
    [ADD_MENUBOX]: {...state, ...{menu: [...state.menu, action.attributes]}},
  }[action.type] || state
}
