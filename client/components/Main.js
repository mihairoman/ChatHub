import React from 'react'
import style from '../styles/style'

/*class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <div className='container'>
        {this.props.children}
      </div>
    )
  }
}*/

const Main = props => {
  return (
    <div className='container valign-wrapper' style={style.maxHeight}>
      {props.children}
    </div>
  )
}

export default Main
