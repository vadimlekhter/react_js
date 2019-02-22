import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/App';


ReactDOM.render(
    <BrowserRouter>
        <MuiThemeProvider>
            <App/>
        </MuiThemeProvider>
    </BrowserRouter>,
    document.getElementById('main'),
);