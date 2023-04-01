import { csrfFetch } from "./csrf";

const LOAD_EVENT_ATTENDEES = "attendees/LOAD_EVENTS_ATTENDEES"
const CLEANUP_ATTENDEES = 'attendees/CLEANUP_ATTENDEES'

export const loadEventAttendees = (attendees) => {
    return {
        type: LOAD_EVENT_ATTENDEES,
        payload: attendees,
    };
};
export const cleanupAttendees = () => {
    return {
        type: CLEANUP_ATTENDEES
    };
};


export const getEventAttendees = (eventId) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}/attendees`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadEventAttendees(data));
    }
};

const initialState = {};

export const attendeesReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOAD_EVENT_ATTENDEES: {
            const newState = { ...state };
            const attendeesObj = {};
            action.payload.Attendees.forEach(attendee => {
                attendeesObj[attendee.id] = attendee;
            });
            newState.attendees = attendeesObj

            return newState;
        }
        case CLEANUP_ATTENDEES: {
            return initialState
        }


        default: {
            return state;
        }
    }
};

export default attendeesReducer;
