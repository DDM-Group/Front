import React from 'react'
import { Route } from "react-router-dom";
import { Header } from 'semantic-ui-react'
import InfoPanel from './InfoPanel'
import './Scouting.scss'

export default function ScoutingInfo() {
    //TODO: make header dynamic (should show path using breadcrumbs)
    return (
        <div className="container">
            <Header as='h2' attached='top'>
                Информация
            </Header>
            <Route exact path="/scouting">
                <InfoPanel/>
            </Route>
        </div>
    )
}