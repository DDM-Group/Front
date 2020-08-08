import React from 'react'
import { Route } from "react-router-dom";
import { Header } from 'semantic-ui-react'
import InfoPanel from './InfoPanel'
import './Library.scss'

export default function Library() {
    //TODO: make header dynamic (should show path using breadcrumbs)
    return (
        <div className="container">
            <Header as='h2' attached='top'>
                База знаний
            </Header>
            <Route exact path="/library">
                <InfoPanel/>
            </Route>
        </div>
    )
}