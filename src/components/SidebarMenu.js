import React from 'react'
import {
    Link
  } from "react-router-dom";
import {
  Sidebar,
  Menu,
  Icon
} from 'semantic-ui-react'
export default function SidebarMenu () {
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
          <Menu.Item as={Link} to="/">
              <Icon name='home' />
              Стартовая страница
          </Menu.Item>
          <Menu.Item as={Link} to="/library">
              <Icon name='book' />
              База знаний
          </Menu.Item>
      </Sidebar>
    )
}