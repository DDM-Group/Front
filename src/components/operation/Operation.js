import React from 'react'
import { Route } from "react-router-dom"
import { Header } from 'semantic-ui-react'
import InfoPanel from './InfoPanel'
import View from './View'
import './Operation.scss'

export default function Operation() {
    //TODO: make header dynamic (should show path using breadcrumbs)
    return (
        <div className="container">
            <Header as='h2' attached='top'>
                Высадки
            </Header>
            <Route exact path="/operation/view">
                <View/>
            </Route>
            <Route exact path="/operation">
                <InfoPanel/>
            </Route>
        </div>
    )
}