import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  Sidebar from './component/Siderbar.js'
import  MessagesList from './component/MessageList.js'
import  AddMessage from './component/AddMessags.js'
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
