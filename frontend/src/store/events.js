import { csrfFetch } from "./csrf";

const LOAD_EVENTS = "events/LOAD_EVENTS";
const ADD_EVENT = "events/ADD_EVENT";
const UPDATE_EVENT = "events/UPDATE_EVENT";
const DELETE_EVENT = "events/DELETE_EVENT";


export const loadEvents = (events) => {
  return {
    type: LOAD_EVENTS,
    payload: events,
  };
};


export const addEvent = (event) => {
  return {
    type: ADD_EVENT,
    payload: event,
  };
};


export const update = (event) => {
  return {
    type: UPDATE_EVENT,
    payload: event,
  };
};


export const remove = (eventId) => {
  return {
    type: DELETE_EVENT,
    payload: eventId,
  };
};


export const getEvents = () => async (dispatch) => {
  const response = await csrfFetch("/api/events");

  if (response.ok) {
    const data = await response.json();
    dispatch(loadEvents(data));
  }
};


export const createEvent = (event) => async (dispatch) => {
  const response = await csrfFetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addEvent(data));
    return data;
  }
};


export const updateEvent = (eventId, event) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(update(data));
    return data;
  }
};


export const deleteEvent = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(remove(eventId));
    return data;
  }
};

const initialState = {};

export const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EVENTS: {
      const allEvents = {};
      action.payload.Events.forEach((event) => {
        allEvents[event.id] = event;
      });
      return {
        ...allEvents,
      };
    }

    case ADD_EVENT: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }

    case UPDATE_EVENT: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }

    case DELETE_EVENT: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default eventsReducer;
