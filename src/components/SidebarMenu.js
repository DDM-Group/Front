import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { Sidebar, Menu, Icon, Image } from 'semantic-ui-react'
import Login from './Login'

export default function SidebarMenu () {
  const [isOpenLogin, setOpenLogin] = useState(false);
  //const user = JSON.parse(localStorage.getItem('user'));
  const user = useSelector(state => state.users.user)
  console.log('user :>> ', user);
    return ( 
      <Sidebar
          as={Menu}
          animation='push'
          direction='left'
          icon='labeled'
          inverted
          vertical
          visible={true}
          width='thin'
          className="leftSidebar"
      >
        { user.id ? <Menu.Item as={Link} to="/user">
            {user.photo !== '' ? <Image src={user.photoUrl} avatar size="mini"/> : <Icon name="user"/>}
            <p> {user.name}</p>
          </Menu.Item> : <Login
          isOpen={isOpenLogin}
          setOpen={setOpenLogin}
        />}
          <Menu.Item as={Link} to="/">
              <Icon name='home' />
              Стартовая страница
          </Menu.Item>
          <Menu.Item as={Link} to="/library">
              <Icon name='book' />
              База знаний
          </Menu.Item> 
          <Menu.Item as={Link} to="/masterclass">
              <Icon name='graduation cap' /> 
              Мастерклассы
          </Menu.Item> 
          <Menu.Item as={Link} to="/operation">
              <Icon name='crosshairs' />
              Высадки
          </Menu.Item>
          <Menu.Item as={Link} to="/operation/view">
              <Icon name='shield alternate' />
              Боевой интерфейс
          </Menu.Item>
      </Sidebar>
    )
}