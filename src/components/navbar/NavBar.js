import _ from "lodash";
import React, { useState } from "react";
import {
  Container,
  Icon,
  Image,
  Menu,
  Sidebar,
  Responsive
} from "semantic-ui-react";

import NavBarChildren from './NavBarChildren'
import NavBarDesktop from './NavBarDesktop'
import NavBarMobile from './NavbarMobile'

export default function NavBar({ children, leftItems, rightItems }) {
    const [visible, setVisible] = useState(false)
  
    const handlePusher = () => {
      if (visible) setVisible(false)
    };
  
    const handleToggle = () => setVisible(!visible);
  
    console.log('visible :>> ', visible);

    return (
    <div>
        <Responsive {...Responsive.onlyMobile}>
            <NavBarMobile
                leftItems={leftItems}
                onPusherClick={handlePusher}
                onToggle={handleToggle}
                rightItems={rightItems}
                visible={visible}
            >
                <NavBarChildren>{children}</NavBarChildren>
            </NavBarMobile>
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <NavBarDesktop leftItems={leftItems} rightItems={rightItems} />
            <NavBarChildren>{children}</NavBarChildren>
        </Responsive>
    </div>
    );
  }