

const EventService = {
  listEvents() {
    return apiRequest(API_CONFIG.eventService, "/api/View/Events");
  },

  getEvent(eventId) {
    return apiRequest(API_CONFIG.eventService, `/api/View/Events/${eventId}`);
  },

  createNewEvent(event) {
    return apiRequest(API_CONFIG.eventService, "/api/Create/Event", "POST", event);
  },

  updateEvent(event) {
    return apiRequest(API_CONFIG.eventService, `/api/Modify/Event`, "PUT", event);
  },

  deleteEvent(eventId, eventImage) {
    return apiRequest(API_CONFIG.eventService, `/api/Delete/Event`, "DELETE", {
      Event_id: eventId,
      Event_image: eventImage
    });
  }
};
