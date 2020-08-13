import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import {Provider} from 'react-redux'
import configureStore from './redux/configureStore'
import 'semantic-ui-less/semantic.less'
import 'semantic-ui-css/semantic.min.css'

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)