import * as types from '../constants/ActionTypes.js'

const users = (state = [], action) => {
  switch (action.type) {
    case types.ADD_USER:
      return state.concat([{
        name: action.name,
        id: action.id
      }])
    case types.USER_LIST:
      return action.users; //返回这个新的user
    default:
      return state

  }
}

export default users;
