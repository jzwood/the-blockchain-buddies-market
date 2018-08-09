import React from 'react'
import { connect } from 'react-redux'
import Aqueduct from '../components/scenes/Aqueduct'
import Trees from '../components/scenes/Trees'

const mapStateToProps = (state, ownProps) => ({
  sceneIndex: state.index
})

const sceneList = [<Aqueduct key='s0' />, <Trees key='s1' />]
const Scene = ({sceneIndex}) => sceneList[sceneIndex] || <div className='intro'>BLOCKCHAIN BUDDIES MARKET</div>

export default connect(mapStateToProps, null)(Scene)
