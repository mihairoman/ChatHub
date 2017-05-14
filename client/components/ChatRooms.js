import React from 'react'
import style from '../styles/style'
import { authenticate } from '../api/authentication'

class ChatRooms extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      authenticated: false
    }
  }

  componentDidMount () {
    this.getAuthentication()
  }

  getAuthentication () {
    authenticate().then(response => {
      console.log(`Now in ChatRooms: ${response}`)
      return response
    }).catch(
      console.error('Something wrong happened in ChatRooms auth')
    )
  }

  render () {
    return (
      <div className='row' style={style.maxWidth}>
        <div className='card large'>
          Hello World
        </div>
      </div>
    )
  }
}

export default ChatRooms
