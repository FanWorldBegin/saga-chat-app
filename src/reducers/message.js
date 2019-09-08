import * as types from '../constants/ActionTypes.js'

//when call message passin the current state ,action and return new actions
const messages = (state = [], action) => {
  switch (action.type) {
    case types.ADD_MESSAGE:
    case types.MESSAGE_RECEIVED: //这两个action 处理相同
      return state.concat([{
        messages: action.messages,
        author: action.author,
        id: action.id
      }])

    default:
      return state
  }
}

export default  messages
