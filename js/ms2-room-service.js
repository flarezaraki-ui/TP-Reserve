
const RoomService = {
  listRooms() {
    return apiRequest(API_CONFIG.roomService, "/api/View/Rooms");
  },
 
  getRoom(roomId) {
    return apiRequest(API_CONFIG.roomService, `/api/View/Rooms/${roomId}`);
  },
 
  createRoom(room) {
    return apiRequest(API_CONFIG.roomService, "/api/Create/Room", "POST", room);
  },
 
  updateRoom(room) {
    return apiRequest(API_CONFIG.roomService, "/api/Modify/Room", "PUT", room);
  },
 
  deleteRoom(roomId, roomImage) {
    return apiRequest(API_CONFIG.roomService, "/api/Delete/Room", "DELETE", {
      Room_id: roomId,
      Room_image: roomImage
    });
  }
};
