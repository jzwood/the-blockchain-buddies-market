import { connect } from 'react-redux'
import { loadScene, buyToken, addSprite } from '../actions'
import MenuBins from '../components/MenuBins'

const mapStateToProps = (state, ownProps) => ({
  //buddies: state.menu.map((token, index) => ({...token, ...{image: state.spriteList[index]}}))
  buddies: state.menu //remove this in favor of above line
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSelect: key => dispatch(loadScene(key)),
  onBuy: (key, address) =>  dispatch(buyToken(key, address))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBins)
