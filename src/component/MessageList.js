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
