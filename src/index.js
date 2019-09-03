import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/App';
import './client/App.scss';
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import store from './client/store'


ReactDOM.render(
    <Provider store={store}>
        <Router >
            <Route exact path="/" component={App} />
        </Router>
    </Provider>,
    document.getElementById('root')
);



