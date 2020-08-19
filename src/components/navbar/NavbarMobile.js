import _ from "lodash";
import React, { Component } from "react";
import {
  Container,
  Icon,
  Image,
  Menu,
  Sidebar,
  Responsive
} from "semantic-ui-react";

export default function NavBarMobile ({
    children,
    leftItems,
    onPusherClick,
    onToggle,
    rightItems,
    visible
}) { 
    return (
        <Sidebar.Pushable>
            <Sidebar
                as={Menu}
                animation="overlay"
                icon="labeled"
                inverted
                vertical
                visible={visible}
            > 
                {_.map(leftItems, item => <Menu.Item {...item} />)}
            </Sidebar>
            <Sidebar.Pusher
                dimmed={visible}
                onClick={onPusherClick}
                style={{ minHeight: "100vh" }}
            >
                <Menu fixed="top" inverted>
                    <Menu.Item onClick={onToggle}>
                        <Icon name="sidebar" />
                    </Menu.Item>
                    <Menu.Menu position="right">
                        {rightItems}
                    </Menu.Menu>
                </Menu>
                {children}
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
}