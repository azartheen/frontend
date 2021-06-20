import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from 'state'
import {fetch as fetchModels} from 'state/model'
import {fetch as fetchModelTemplates} from 'state/modelTemplate'
import {fetchModelInputs, fetchModelOutputs} from 'state/trading'
import {fetch as fetchATEs} from 'state/ATE'

// set em size
document.getElementsByTagName("html")[0].style.fontSize = window.screen.availWidth * 0.01 + "px";

window.screenW = window.screen.availWidth;
window.screenH = window.screen.availHeight;

const store = createStore(reducers);
window.store = store;

// Fetch everything
fetchModels(store.dispatch);
fetchModelTemplates(store.dispatch);
fetchModelInputs(store.dispatch);
fetchModelOutputs(store.dispatch);
fetchATEs(store.dispatch);

// render app and redux store
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
