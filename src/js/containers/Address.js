import React from 'react'
import { connect } from 'react-redux'
import Aqueduct from '../scenes/Aqueduct'
import Trees from '../scenes/Trees'

const fallback = <span style={{color:'red'}}>no address detected</span>
const mapStateToProps = (state, ownProps) => ({
  address: state.user
})

export default connect(mapStateToProps, null)(({address}) => address ? <span>{ address }</span> : fallback)
