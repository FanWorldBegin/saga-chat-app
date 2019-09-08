//input filed dispach
import React, { Component } from 'react'
import PropTypes from 'prop-types'


const Messages = ({messages, author}) => {
  return (
    <p>
      <li> {author}: {messages}</li><br/> 
    </p>
  )
}


Messages.PropTypes = {
  messages: PropTypes.string.isRequired,
   author: PropTypes.string.isRequired,
}

export default Messages

//render by MessageList component
