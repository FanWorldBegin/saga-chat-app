import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {addUser} from './action/index.js'

import { Provider } from "react-redux"
import { createStore } from 'redux'
import chat from './reducers'
const store = createStore(chat)

//将自己显示在联系人列表
store.dispatch(addUser('Me'))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
