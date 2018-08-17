import React from 'react'
import { connect } from 'react-redux'
import Aqueduct from '../scenes/Aqueduct'
import Trees from '../scenes/Trees'

const mapStateToProps = (state, ownProps) => ({
  sceneIndex: state.index
})

const sceneList = [<Aqueduct key='s0' />, <Trees key='s1' />]
const Scene = ({sceneIndex}) => sceneList[sceneIndex] || <div className="title-scene">Blockchain Buddies</div>

export default connect(mapStateToProps, null)(Scene)
