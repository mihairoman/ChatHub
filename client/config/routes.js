import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Main from '../components/Main'
import Login from '../components/Login'
import ChatRooms from '../components/ChatRooms'

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Login} />
      <Route path='chatrooms' component={ChatRooms} />
    </Route>
  </Router>
)

export default routes
