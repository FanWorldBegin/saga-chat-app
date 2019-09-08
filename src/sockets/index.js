import * as types from './../constants/ActionTypes';
import { addUser, messageReceived, populateUserList} from '../action/index';

const setupSocket = (dispatch, username) => {
  const socket = new WebSocket('ws://localhost:8989');
  //打开连接时候发送信息
  socket.onopen = () => {
    socket.send(JSON.stringify({
      type: types.ADD_USER,
      name: username
    }))
  }

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
  }
}