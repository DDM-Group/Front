import React from 'react'
import { Route } from "react-router-dom";
import { Header } from 'semantic-ui-react'
import Info from './Info'
import InfoPanel from './InfoPanel'
import './Masterclass.scss'

export default function Masterclass() {
    //TODO: make header dynamic (should show path using breadcrumbs)
    return (
        <div className="container">
            <Header as='h2' attached='top'>
                Мастерклассы
            </Header>
            <Route exact path="/masterclass">
                <InfoPanel/>
            </Route>
            <Route path={`/masterclass/:infoId`}>
                <Info/>
            </Route>
        </div>
    )
}