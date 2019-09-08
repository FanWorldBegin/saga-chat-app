const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8989})

//用户列表
const users = []

//传入数据和 webserver
const broadcast = (data, ws) => {
  wss.clients.forEach((client) => {
    // 
    if(client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data))
    }
  })
}

// 客户端连接，开始监听ADD_USER， DD_MESSAGE
wss.on('connection', (ws) => {
  let index;
  ws.on('message', (message) => {
    const data = JSON.parse(message)
    switch (data.type) {
      case 'ADD_USER':
        index = users.length
        users.push({name: data.name, id: index + 1})
        ws.send(JSON.stringify({
          type: 'USER_LIST',
          users
        }))
        // 广播给所有用户
        broadcast({
          type: 'USER_LIST',
          users
        }, ws)
        break;
        case 'ADD_MESSAGE':
          broadcast({
            type: 'ADD_MESSAGE',
            messages: data.message,
            author:data.author
          }, ws)
        break;
      default:
        break;
    }
  })
})

ws.on('close', () => {
  //有人关闭，则删除
  users.splice(index,1);
  broadcast({
    type: "USER_LIST",
    users
  })
})
