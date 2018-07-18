/*
 * action types
 */
export const LOAD_SCENE = 'LOAD_SCENE'
export const ADD_SPRITE = 'ADD_SPRITE'
export const BUY_SPRITE = 'BUY_SPRITE'
export const REMOVE_ALL_SPRITES = 'REMOVE_ALL_SPRITES'
export const ADD_MENUBOX = 'ADD_MENUBOX'

/*
 * action creators
 */
export function loadScene(index) {
  return {
    type: LOAD_SCENE,
    index
  }
}

export function addSprite(index) {
  return {
    type: ADD_SPRITE,
    index
  }
}

export const removeAllSprites = () => ({
  type: REMOVE_ALL_SPRITES
})

export function buySprite(index) {
  return {
    type: BUY_SPRITE,
    index
  }
}

export function addMenubox(index) {
  return {
    type: ADD_MENUBOX,
    index
  }
}
