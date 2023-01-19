import { csrfFetch } from "./csrf";

//Actions
const LOAD_EVENTS = "events/LOAD_EVENTS";
const ADD_EVENT = "events/ADD_EVENT";
const UPDATE_EVENT = "events/UPDATE_EVENT";
const DELETE_EVENT = "events/DELETE_EVENT";
const ADD_EVENT_IMAGE = "events/ADD_EVENT_IMAGE";
const GET_SINGLE_EVENT = "events/GET_SINGLE_EVENT"

//Action Creators
export const loadEvents = (events) => {
  return {
    type: LOAD_EVENTS,
    payload: events,
  };
};


export const addEvent = (newEvent, newSingleEvent) => {
  return {
    type: ADD_EVENT,
    payload: {newEvent, newSingleEvent}
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

// export const addEventImage = (image, eventId) =>{
//   return {
//     type: ADD_EVENT_IMAGE,
//     payload: {image, eventId}
//   }
// }

export const getSingleEvent = (event) =>{
  return{
    type: GET_SINGLE_EVENT,
    payload: event
  }
}


//thunks
export const getSingleEventThunk = (eventId) => async (dispatch) =>{
  const response = await csrfFetch(`/api/events/${eventId}`)

  if(response.ok){
    const data = await response.json();
    dispatch(getSingleEvent(data))
  }
}

// export const addEventImageThunk = (image, eventId) => async(dispatch) =>{
//   const response = await csrfFetch(`/api/events/${eventId}/images`,{
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(image),
//   })
//   if (response.ok){
//     const data = await response.json();
//     dispatch(addEventImage(data))
//     return data;
//   }
// }

export const getEvents = () => async (dispatch) => {
  const response = await csrfFetch("/api/events");

  if (response.ok) {
    const data = await response.json();
    dispatch(loadEvents(data));
  }
};


export const createEvent = (event, image, sessionUser,groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  if (response.ok) {
    const newEvent = await response.json();
    console.log("newEvent from events store", newEvent)
    const response2 = await csrfFetch(`api/events/${newEvent.id}/images`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(image),
  })
  if (response2.ok){
    const newImage = await response2.json();
    const newSingleEvent = {...newEvent}
    console.log("newImage from events store", newImage)
    // newSingleEvent[]
    // newSingleEvent[]
    dispatch(addEvent(newEvent, newSingleEvent))
  }
};
}


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

const initialState = {
  allEvents: {},
  singleEvent: {}
};

export const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EVENTS: {
      const newState = {...state}
      action.payload.Events.forEach((event) => {
        newState.allEvents[event.id] = event;
      });
      return newState;
    }

    case ADD_EVENT: {
      const newState = { ...state, allEvents: { ...state.allEvents }, singleEvent: {} };
      newState.allGroups[action.payload.newEvent.id] = action.payload.newEvent;
      newState.singleEvent = action.payload.newSingleEvent
      return newState;
    }

    case UPDATE_EVENT: {
      const newState = { ...state };
      newState.allEvents[action.payload.id] = action.payload;
      return newState;
    }

    case DELETE_EVENT: {
      const newState = { ...state };
      delete newState.allEvents[action.payload];
      return newState;
    }
    case ADD_EVENT_IMAGE: {
      const newState = { ...state };
      newState[action.payload.eventId] ={
        ...newState.allEvents[action.payload.eventId],
      previewImage:action.payload.image}
      return newState;
    }

    case GET_SINGLE_EVENT: {
      const newState = { ...state };
      newState.singleEvent = action.payload
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default eventsReducer;
