import { connect } from 'react-redux'
import { loadScene, buyToken, addSprite } from '../actions'
import MenuBins from '../components/MenuBins'

const mapStateToProps = (state, ownProps) => ({
  buddies: state.menu
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSelect: key => dispatch(loadScene(key)),
  onBuy: (key, address) =>  dispatch(buyToken(key, address))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBins)
