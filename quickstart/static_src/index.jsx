import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/App';
import initStore from './utils/store';


const history = createHistory();
const middleware = routerMiddleware(history);

ReactDOM.render(
    <Provider store={initStore([middleware])}>
        <ConnectedRouter history={ history }>
            <MuiThemeProvider>
                <App/>
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('main'),
);