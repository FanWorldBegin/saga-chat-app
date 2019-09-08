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
