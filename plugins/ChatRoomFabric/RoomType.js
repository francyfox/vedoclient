export default class RoomType {
  constructor (RouterPath) {
    this.RouterPath = RouterPath.toString().toLowerCase()
  }

  createRoom () {
    const RoomURL = 'ws://localhost:8080/' + this.RouterPath
    const conn = new WebSocket(RoomURL)
    return conn
  }
}
