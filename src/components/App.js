import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom"
import {
    Segment,
    Sidebar
} from 'semantic-ui-react'
import SidebarMenu from './SidebarMenu'
import Home from './Home'
import Library from './library/Library'
import Masterclass from './masterclass/Masterclass'
import UserPanel from './UserPanel'
import Operation from './operation/Operation'
import '../assets/styles/App.scss'
import {autoupdateUserRequest} from '../redux/modules/users'
import {useDispatch, useSelector} from 'react-redux'

export default function App() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const user = useSelector(state => state.users.user)
    console.log('user :>> ', user);
    console.log('token && !user :>> ', token && !user.id);
    if (token && !user.id) dispatch(autoupdateUserRequest())
    return (
      <Router>
        <Sidebar.Pushable>
          <SidebarMenu/>
          <Sidebar.Pusher>
            <Segment style={({minHeight: '100%'})}>
              <Switch>
                <Route path="/library">
                  <Library />
                </Route>
                <Route path="/user">
                  <UserPanel />
                </Route>
                <Route path="/masterclass">
                  <Masterclass />
                </Route>
                <Route path="/operation">
                   <Operation />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Router>
    )
}