import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App/index';
import { store } from './store/store';
import config from './config';
import './assets/scss/style.scss';
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
// basename={config.basename}
ReactDOM.render(app, document.getElementById('root'));
