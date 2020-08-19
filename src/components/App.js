import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, Link} from "react-router-dom"
import { Segment, Sidebar, Menu, Image, Icon  } from 'semantic-ui-react'
import SidebarMenu from './SidebarMenu'
import Library from './library/Library'
import Scouting from './scoutingInfo/ScoutingInfo'
import Masterclass from './masterclass/Masterclass'
import UserPanel from './UserPanel'
import Operation from './operation/Operation'
//import '../assets/styles/App.scss'
import {autoupdateUserRequest} from '../redux/modules/users'
import {useDispatch, useSelector} from 'react-redux'
import NavBar from './navbar/NavBar'
import Login from './Login'

export default function App() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const user = useSelector(state => state.users.user)
    const [isOpenLogin, setOpenLogin] = useState(false);
    console.log('user :>> ', user);
    useEffect(() => {
      dispatch(autoupdateUserRequest())
    }, [token, user.id])

    const leftItems = user.id ? [
      { as: Link, to: "/library", content: "База знаний", key: "library", icon: 'book' },
      { as: Link, to: "/scouting", content: "Разведка", key: "scouting", icon: 'user secret' },
      { as: Link, to: "/masterclass", content: "Мастерклассы", key: "masterclass", icon: 'graduation cap' },
      { as: Link, to: "/operation", content: "Высадки", key: "operation", icon: 'crosshairs' },
      { as: Link, to: "/operation/view", content: "Боевой интерфейс", key: "view", icon: 'shield alternate' },
    ] : [
      { as: Link, to: "/library", content: "База знаний", key: "library", icon: 'book' },
      { as: Link, to: "/operation/view", content: "Боевой интерфейс", key: "view", icon: 'shield alternate' },
    ];
    const rightItems = user.id ? [
      <Menu.Item as={Link} to="/user">
            {user.photo !== '' ? <Image src={user.photoUrl} avatar size="mini"/> : <Icon name="user"/>}
            <p>  {user.name}</p>
      </Menu.Item>
    ] : [
      <Login
          isOpen={isOpenLogin}
          setOpen={setOpenLogin}
        />
    ];

    return (
      <Router>
        <NavBar leftItems={leftItems} rightItems={rightItems}>
            <Segment style={({minHeight: '100%'})}>
              <Switch>
                <Route path="/library">
                  <Library />
                </Route>
                  <Route path="/scouting">
                      <Scouting/>
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
                    <Redirect to="/library" />
                </Route>
              </Switch>
            </Segment>
        </NavBar>
      </Router>
    )
}