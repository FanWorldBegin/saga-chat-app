import { combineReducers } from 'redux'
import messages from './message'
import users from './user.js'

const chat = combineReducers({
  messages,
  users
})

export default chat
