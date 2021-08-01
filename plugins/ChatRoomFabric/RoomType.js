/**
 * Create Websocket Rooms
 * @param {string} wsURL - Websocket URL path
 * @param {string} RouterPath - Websocket Router Endpoint
 */
export default class RoomType {
  /**
   * Set Room URL
   * @param {string} wsURL - Websocket URL path
   * @param {string} RouterPath - Websocket Router Endpoint
   */
  constructor (wsURL, RouterPath) {
    this.wsURL = wsURL.toString()
    this.RouterPath = RouterPath.toString().toLowerCase()
  }

  /**
   * Set new Room params
   * @param {Object} Room - Room
   */
  listenRoom (Room) {
    const RoomURL = this.wsURL + this.RouterPath
    const conn = new WebSocket(RoomURL)

    conn.onopen = function (e) {
      console.info(`[${Room.groupName}] Connection established`)
    }

    conn.onerror = function (event) { alert('Received error') }
    return conn
  }
}
