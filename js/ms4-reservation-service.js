const ReservationService = {
  listEventReservations() {
    return apiRequest(API_CONFIG.reservationService, "/api/View/Event/Reservations");
  },

  listRoomReservations() {
    return apiRequest(API_CONFIG.reservationService, "/api/View/Room/Reservations");
  },

  ListUserRoomReservations(userId){
    return apiRequest(API_CONFIG.reservationService, `/api/View/Room/Reservations/User/${userId}`);
  },

  ListRoomReservationsByRoomId(roomId){
    return apiRequest(API_CONFIG.reservationService, `/api/View/Room/Reservations/${roomId}`);
  },

  ListEventReservationsByEventId(eventId){
    return apiRequest(API_CONFIG.reservationService, `/api/View/Event/Reservations/${eventId}`);
  },

  ListUserEventReservations(userId) {
  return apiRequest(API_CONFIG.reservationService, `/api/View/Event/Reservations/User/${userId}`);
  },
 
  getReservation(reservationId) {
    return apiRequest(API_CONFIG.reservationService, `/api/View/Room/Reservations/${reservationId}`);
  },

  getEventReservation(reservationId) {
    return apiRequest(API_CONFIG.reservationService, `/api/View/Event/Reservations/${reservationId}`);
  },
 
  createReservation(reservation) {
    // Expected shape: { User_id, Room_id, Room_image,
    //                    Room_datetime, Room_duration, Pax_count }
    return apiRequest(API_CONFIG.reservationService, "/api/Add/Room/Reservations", "POST", reservation);
  },

  createEventReservation(reservation) {
    // Expected shape: { User_id, Event_id, Pax_count }
    return apiRequest(API_CONFIG.reservationService, "/api/Add/Event/Reservations", "POST", reservation);
  },

  updateEventReservation(reservation) {
    return apiRequest(API_CONFIG.reservationService, "/api/Modify/Event/Reservations", "PUT", reservation);
  },

  cancelEventReservation(eventBookingId) {
    return apiRequest(API_CONFIG.reservationService, "/api/Delete/Event/Reservations", "DELETE", {
      Event_booking_id: eventBookingId
    });
  },
 
  updateReservation(reservation) {
    return apiRequest(API_CONFIG.reservationService, "/api/Modify/Room/Reservations", "PUT", reservation);
  },
 
  // Your DELETE Lambda reads Room_booking_id + Room_image from the body,
  // not a URL param - so both need to be passed in here.
  cancelReservation(roomBookingId) {
    return apiRequest(API_CONFIG.reservationService, "/api/Delete/Room/Reservations", "DELETE", {
      Room_booking_id: roomBookingId
    });
  }
};