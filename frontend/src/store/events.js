import { csrfFetch } from "./csrf";

//Actions
const LOAD_EVENTS = "events/LOAD_EVENTS";
const ADD_EVENT = "events/ADD_EVENT";
const UPDATE_EVENT = "events/UPDATE_EVENT";
const DELETE_EVENT = "events/DELETE_EVENT";
const ADD_EVENT_IMAGE = "events/ADD_EVENT_IMAGE";
const GET_SINGLE_EVENT = "events/GET_SINGLE_EVENT"

const LOAD_GROUPS_EVENTS = "events/LOAD_GROUPS_EVENTS"


//Action Creators
export const loadEvents = (events) => {
  return {
    type: LOAD_EVENTS,
    payload: events,
  };
};

export const loadGroupsEvents = (events) => {
  return {
    type: LOAD_GROUPS_EVENTS,
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
    return data;
  }
}


export const getEvents = () => async (dispatch) => {
  const response = await csrfFetch("/api/events");

  if (response.ok) {
    const data = await response.json();
    dispatch(loadEvents(data));
  }
};

export const getGroupsEvents = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/events`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadGroupsEvents(data));
    return data
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

    const response2 = await csrfFetch(`/api/events/${newEvent.id}/images`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(image),
  })
  if (response2.ok){
    const newImage = await response2.json();
    const newSingleEvent = {...newEvent}
    newSingleEvent['EventImages']=newImage
    // newSingleEvent[]
    dispatch(addEvent(newEvent, newSingleEvent))
    return newEvent
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
    console.log('eventID from deleteEventThunk', eventId)
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
      const eventsObj = {};
      action.payload.Events.forEach(event => {
          eventsObj[event.id] = event;
      });
      const newState = { ...state };
      newState.allEvents = { ...eventsObj };
      return newState;
      // const newState = {...state}
      // action.payload.Events.forEach((event) => {
      //   newState.allEvents[event.id] = event;
      // });
      // return newState;
    }

    case LOAD_GROUPS_EVENTS: {
      const eventsObj = {};
      action.payload.Events.forEach(event => {
          eventsObj[event.id] = event;
      });
      const newState = { ...state };
      newState.allEvents = { ...eventsObj };
      return newState;
    }

    // case LOAD_EVENT_ATTENDEES: {
    //   const newState = { ...state };
    //   const attendeesObj = {};
    //   action.payload.Attendees.forEach(attendee => {
    //     attendeesObj[attendee.id] = attendee;
    //   });
    //   newState.singleEvent.Attendees = attendeesObj

    //   return newState;
    // }

    case ADD_EVENT: {
      const newState = { ...state, allEvents: { ...state.allEvents }, singleEvent: {} };
      newState.allEvents[action.payload.newEvent.id] = action.payload.newEvent;
      newState.singleEvent = action.payload.newSingleEvent
      return newState;
    }

    case UPDATE_EVENT: {
      const newState = { ...state };
      newState.allEvents[action.payload.id] = action.payload;
      return newState;
    }

    case DELETE_EVENT: {
      const newState = { ...state, allEvents:{...state.allEvents} };
      delete newState.allEvents[action.payload];
      // const newState= {...state}
      // const copyState = {...newState.allEvents}
      // delete copyState.allEvents[action.eventId];
      // newState.allEvents = copyState
      // newState.singleEvent = {}
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
