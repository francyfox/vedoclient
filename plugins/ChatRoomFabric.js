// import groupRoom from './ChatRoomFabric/groupRoom'
// import userRoom from './ChatRoomFabric/userRoom'
import RoomType from './ChatRoomFabric/RoomType'

export default class ChatRoomFabric {
  create (type) {
    let room
    if (type === 'group') {
      // eslint-disable-next-line new-cap
      room = new RoomType()
    } else if (type === 'user') {
      // eslint-disable-next-line new-cap
      room = new RoomType()
    }
    room.type = type
    room.openRoom = function () {
      console.log('test')
    }
  }
}
