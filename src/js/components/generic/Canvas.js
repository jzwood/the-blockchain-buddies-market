import React from 'react'

class Canvas extends React.Component {

  constructor(props) {
    super(props)
    this.setCanvas = canvas => {
      this.canvas = canvas
    }
  }

  render() {
    const { width, height, classlist } = this.props
    return(
      <canvas ref={canvas => {this.canvas = canvas}} className={classlist.join(' ')} width={width} height={height} />
    )
  }
}

Canvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  classlist: propTypes.array
}

export default Canvas
