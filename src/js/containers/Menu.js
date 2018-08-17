import { connect } from 'react-redux'
import { setIndex, buyToken } from '../actions'
import MenuBins from '../components/MenuBins'

const mapStateToProps = (state, ownProps) => ({
  buddies: state.menu.map((token, index) => ({...token, ...{image: state.spriteList[index]}})),
  address: state.user
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSelect: key => dispatch(setIndex(key))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBins)
