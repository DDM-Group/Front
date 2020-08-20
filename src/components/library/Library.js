import React from 'react'
import { Route, Link } from "react-router-dom";
import { Menu } from 'semantic-ui-react'
import InfoPanel from './InfoPanel'
import './Library.scss'

export default function Library() {
    //TODO: make header dynamic (should show path using breadcrumbs)
    return (
        <div className="container">
            <Menu>
                <Menu.Item header
                           as={Link}
                           to="/library">
                    База знаний
                </Menu.Item>
                <Menu.Item
                    as={Link}
                    to="/library?type=bg"
                    content="Боевые Группы"
                    key="library"
                />
                <Menu.Item
                    as={Link}
                    to="/library?type=planet"
                    content="Планеты и расы"
                    key="planet"
                />
                <Menu.Item
                    as={Link}
                    to="/library?type=person"
                    content="Личности"
                    key="person"
                />
                <Menu.Item
                    as={Link}
                    to="/library?type=operation"
                    content="Высадки"
                    key="operation"
                />
                <Menu.Item
                    as={Link}
                    to="/library?type=other"
                    content="Прочее"
                    key="other"
                />
            </Menu>
            <Route exact path="/library">
                <InfoPanel/>
            </Route>
        </div>
    )
}