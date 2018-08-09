import { ADD_TOKEN } from '../actions'

const STUB_TOKEN = {
  name: 'the roman',
  price: 0.0131,
  available: true,
  address: '0x12345'
}

const STUB_TOKEN_2 = {
  name: 'the druid',
  price: 0.0131,
  available: true,
  address: '0x12345'
}

const STUB_TOKEN_3 = {
  name: 'mystery',
  price: 0.011,
  available: true,
  address: '0x4321'
}

export default {start}

function start() {
  const tokenEvent = new CustomEvent(ADD_TOKEN, {detail: STUB_TOKEN})
  setTimeout(() => {
    document.dispatchEvent(tokenEvent)
  }, 500)

  const tokenEvent2 = new CustomEvent(ADD_TOKEN, {detail: STUB_TOKEN_2})
  setTimeout(() => {
    document.dispatchEvent(tokenEvent2)
  }, 1500)

  const tokenEvent3 = new CustomEvent(ADD_TOKEN, {detail: STUB_TOKEN_3})
  setTimeout(() => {
    document.dispatchEvent(tokenEvent3)
  }, 2500)
}
