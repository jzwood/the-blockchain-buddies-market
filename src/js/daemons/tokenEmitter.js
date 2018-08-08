import { ADD_TOKEN } from '../actions'

const STUB_TOKEN = {
  name: 'my token',
  price: 0.0131,
  available: true,
  address: '0x12345'
}

export default {start}

function start() {
  const tokenEvent = new CustomEvent(ADD_TOKEN, {detail: STUB_TOKEN})
  setTimeout(() => {
    document.dispatchEvent(tokenEvent)
  }, 500)
}
