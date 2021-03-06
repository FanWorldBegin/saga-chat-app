This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


# 基于react-saga的简易chatAPP
------------------------
## 1.app.js基本布局
```
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
class App extends Component {
  render() {
    return (
      <div id="container">
        <aside id="sidebar">Users</aside>
        <section id="main">
          <section id="message-list">Message List</section>
          <section id="new-message">New message</section>
        </section>
      </div>
    );
  }
}
export default App;
```
## 2.安装redux
yarn add redux react-redux
```
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Sidebar } from './containers/Sidebar'
import { MessagesList } from './containers/MessagesList'
import { AddMessage } from './containers/AddMessage'
class App extends Component {
  render() {
    return (
      <div id="container">
        <Sidebar />
        <section id="main">
          <MessagesList />
          <AddMessage />
        </section>
      </div>
    );
  }
}
export default App;
```
### 初始化redux

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux"
import { createStore } from 'redux'
import chat from './reducers'
const store = createStore(chat)
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();

```


## 3. actions
所有的操作都是根据 diapach action 来实现的
1. 创建新的action 文件夹
2. 创建新的costants ／ActionTypes.js 存放所有的 action类型

### action.js
```javascript
import * as types from '../constants/ActionsTypes';
let nextMessageId = 0;
const nextUserId = 0;
// add Meaagse 时候 call this addMesage action and passIn  the message and the author
export const addMessage = (message, author) => ({
  type: types.ADD_MESSAGE,
  id: nextMessageId++,
  message,
  author
})
//action addUser
export const addUser = name => ({
  type: types.ADD_USER,
  id: nextUserId ++,
  name
})
//action MESSAGE_RECEIVED
export const messageReceived = (message, author) => ({
  type: types.MESSAGE_RECEIVED,
  id: nextMessageId++,  //
  message,
  author,
})
export const populateUserList = users => ({
  type: types.USER_LIST,
  users
})
```

### 创建新的costants ／ActionTypes.js 存放所有的 action类型

```javascript
export const ADD_MESSAGE = "ADD_MESSAGE"
export const MESSAGE_RECEIVED = "MESSAGE_RECEIVED"
export const ADD_USER = "ADD_USER"
export const USER_LIST = "USER_LIST"
```

## 4. reducers

### reducer/index.js
合并messageReducer 和 userReducer
```javascript
import { combineReducers } from 'redux'
import message from './message'
import users from './users'
const chat = combineReducers({
  messages,
  users
})
export default chat
```

#### messageReducer
```javascript
import * as types from '../constants/ActionTypes.js'
//when call message passin the current state ,action and return new actions
const messages = (state = [], action) => {
  switch (action.type) {
    case types.ADD_MESSAGE:
    case types.MESSAGE_RECEIVED: //这两个action 处理相同
      return state.concat([{
        message: action.message,
        author: action.author,
        id: action.id
      }])
default:
      return state
  }
}
export default  messages
```
#### user.js
```javascript
import * as types from '../constants/ActionTypes.js'
const users = (state = [], action) => {
  switch (action.type) {
    case types.ADD_USER:
      return state.concat([{
        name: action.name,
        id: action.id
      }])
    case types.USERS_LIST:
      return action.users; //返回这个新的users
    default:
      return state
}
}
export default users;
```

## 5.AddMessage.js 
component 下的组件只展示数据没有与redux 相连
```javascript
//input filed dispach
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addMessage } from '../action'

const AddMessage = (props) => {
  let input;
  return (
    <section className="new-message">
      <input type="text"
        onKeyPress={(e) => {
          if(e.key == 'Enter') {
            props.dispach(input.value, "Me")
            input.value=""
          }
        }}
        type='text'
        ref={(node) => {
          input = node
        }}
      />
    </section>
  )
}


AddMessage.PropTypes = {
  dispach: PropTypes.func.isRequired
}

const mapDispatchToProps = dispach => ({
  dispach: (messages, author) => {
    dispach(addMessage(messages, author))
  }
})

const AddMessage_connect = connect(() => ({}), mapDispatchToProps)(AddMessage)
export default AddMessage_connect


```

## 6. component/Message 

### Message.js
```javascript
//input filed dispach
import React, { Component } from 'react'
import PropTypes from 'prop-types'
const Messages = ({messages, author}) => {
  return (
    <p>
      <li> {author}: </li> {messages}
    </p>
  )
}
Messages.PropTypes = {
  messages: PropTypes.string.isRequired,
   author: PropTypes.string.isRequired,
}
export default Messages
//render by MessageList component
```
### MessaageList.js
```javascript
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Message from './Messags.js'
const MessageList = {{ messages }} => {
  <section id="message-list">
    <ul>
      {messages.map(message => (
        <Messages
          key={message.id}
          {...message}
        />
      ))}
    </ul>
  </section>
}
MessageList.PropTYpes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,isRequired,
      message: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
}
export default MessageList;
```

## 7. component/sidebar
```javascript
import React, { Component } from 'react'
import PropTypes from 'prop-types'
const Sidebar = ({ users }) => (
  <aside className="siderbar" id ='siderbar'>
    <ul>
      { users.map(user => （
        <li key={user.id}>{user.name}</li>
      ）)}
    </ul>
  </aside>
)
Sidebar.ProTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired
}
export default Sidebar
```

## 8. MessageList
```javascript
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Messages from './Messags.js'
import { connect } from 'react-redux'
const MessageList = ({ messages }) => {
  console.log(messages);
  return (
    <section id="messages-list">
      <ul>
        { messages.map(message => (
          <Messages
            key={message.id}
            {...message}
          />
        ))}
      </ul>
    </section>
  )
    console.log("Messages: " + Messages);
}
MessageList.PropTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      messages: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
}
const MessageList_connect = connect(state => ({
  messages: state.messages, //reducer 的名字
}), {})(MessageList)
export default  MessageList_connect;
```
## 9. 将自己加入聊天列表
修改index.js,store 在开始的时候就将 Me 加入列表。
```javascript
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

```
