import * as types from '../constants/ActionTypes.js';

let nextMessageId = 0;
let nextUserId = 0;

// add Meaagse 时候 call this addMesage action and passIn  the message and the author
export const addMessage = (messages, author) => ({
  type: types.ADD_MESSAGE,
  id: nextMessageId++,
  messages,
  author
})

//action addUser
export const addUser = name => ({
  type: types.ADD_USER,
  id: nextUserId ++,
  name
})

//action MESSAGE_RECEIVED
export const messageReceived = (messages, author) => ({
  type: types.MESSAGE_RECEIVED,
  id: nextMessageId++,  //
  messages,
  author,
})

export const populateUserList = users => ({
  type: types.USER_LIST,
  users
})


//addMessage i add message; messageReceived otheruser add message. message anyways

// var x = a => {a: 1}
// 相当于
// var x = function (a) {
// 	a: 1
// }
//
// var x = var x = a => ({a: 1})
// 相当于
// var x = function (a) {
// 	return {a: 1}
// }
