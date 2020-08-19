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

export default function NavBarDesktop ({ leftItems, rightItems }) {
    return  (
            <Menu fixed="top" inverted>
                {_.map(leftItems, item => <Menu.Item {...item} />)}
                <Menu.Menu position="right">
                    {rightItems}
                </Menu.Menu>
            </Menu>
        );
    }