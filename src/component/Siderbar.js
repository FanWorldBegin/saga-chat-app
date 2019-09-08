import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

const Sidebar =  ({ users })  => (
  <aside className="sidebar" id ='sidebar'>
    <ul>
      { users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
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


const Sidebar_connect = connect(state => ({
  users: state.users
}), {})(Sidebar)

export default Sidebar_connect
