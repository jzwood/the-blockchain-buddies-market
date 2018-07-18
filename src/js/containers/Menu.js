import { connect } from 'react-redux'
import { loadScene, buySprite, addSprite } from '../actions'
import MenuBins from '../components/MenuBins'

const mapStateToProps = (state, ownProps) => ({
  buddies: state.menu
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSelect: key => dispatch(loadScene(key)),
  onBuy: key =>  dispatch(buySprite(key))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBins)
