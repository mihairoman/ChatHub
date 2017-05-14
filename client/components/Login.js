import React from 'react'
import { Link } from 'react-router'
import style from '../styles/style'

const Login = () => {
  return (
    <div className='row' style={Object.assign({}, style.centered, style.btnForm)}>
      <div className='card-panel small'>
        <Header className='center' style={Object.assign({}, style.header, style.breakWord)}>Welcome to ChatHub</Header>
        <List className='center' style={style.borderless}>
          <Link to='/chatrooms'>
            <Btn className='white-text btn-large blue lighten-2' style={{ width: '90%' }}> Login with Twitter </Btn>
          </Link>
          <Btn className='white-text btn-large red accent-2' style={{ width: '90%' }}> Login with Gmail </Btn>
        </List>
      </div>
    </div>
  )
}

const Header = ({className, ...props}) => {
  const classes = `header ${className}`

  return (
    <div className={classes} {...props} />
  )
}

const List = ({className, style, ...props}) => {
  const classes = `collection ${className}`
  const listItems = props.children.map((item, index) =>
    <ListItem key={index.toString()}>{item}</ListItem>
  )

  return (
    <ul className={classes} style={style}>
      {listItems}
    </ul>
  )
}

const ListItem = (props) => {
  return (
    <li className='collection-item' style={style.borderless}>
      {props.children}
    </li>
  )
}

const Btn = ({className, tagName, tagType, ...props}) => {
  const classes = `btn ${className}`
  const Tag = props.href ? 'a' : 'button'
  const type = tagType || 'button'

  return (
    <Tag type={type} className={classes} {...props} />
  )
}

export default Login
