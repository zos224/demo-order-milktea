import { Server } from 'socket.io'

const SocketHandler = (req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: '/api/socket',
      addTrailingSlash: false,
      pingInterval: 60000,
      pingTimeout: 60000,
    })

    io.on('connection', socket => {
        socket.join('admin')
        socket.on('new order', () => {
            io.to('admin').emit('new order', null)
        })
    })

    res.socket.server.io = io
    
  } 
  res.end()
}

export default SocketHandler