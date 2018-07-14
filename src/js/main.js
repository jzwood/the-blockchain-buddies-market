import { renderCharBoxes } from './menu'

import druidImagePath from '../assets/druid.png'
import romanImagePath from '../assets/roman.png'


document.addEventListener('DOMContentLoaded', main)

function main() {
  var blockchainChars = [['druid', 0.0019, true] , ['roman', 0.0012, false],['witch', 0.0043, true],0,0,0,0,0,0,0,0] // from blockchain
  const charImages = [druidImagePath, romanImagePath]
  const chars = blockchainChars.map((char, index) => {
    return {name: char[0], price: char[1], available: char[2], image: charImages[index]}
  })

  renderCharBoxes(chars)
}
