import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {applyMiddleware, createStore} from "redux"
import { Provider } from 'react-redux';
import thunk from "redux-thunk"
import suggestionsReudcer from './reducer';

const store = createStore(suggestionsReudcer, applyMiddleware(thunk))
ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>
  
, document.getElementById('root'));