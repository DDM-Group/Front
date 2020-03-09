import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom"
import {
    Segment,
    Sidebar
} from 'semantic-ui-react'
import SidebarMenu from './SidebarMenu'
import Footer from './Footer'
import Home from './Home'
import Library from './library/Library'
import '../assets/styles/App.scss'

class App extends React.Component {

    render() {
        return (
            <Router>
                <Sidebar.Pushable>
                   <SidebarMenu/>
                   <Sidebar.Pusher>
                        <Segment style={({minHeight: '100%'})}>
                            <Switch>
                                    <Route path="/library">
                                        <Library />
                                    </Route>
                                    <Route path="/">
                                        <Home />
                                    </Route>
                            </Switch>
                            <Footer/>
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Router>
        )
    }
}

export default App