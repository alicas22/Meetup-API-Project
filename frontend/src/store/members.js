import { csrfFetch } from "./csrf";

const LOAD_GROUP_MEMBERS = "members/LOAD_GROUP_MEMBERS"
const CLEANUP_MEMBERS = 'members/CLEANUP_MEMBERS'

export const loadGroupMembers = (members) => {
    return {
        type: LOAD_GROUP_MEMBERS,
        payload: members,
    };
};
export const cleanupMembers= () => {
    return {
        type: CLEANUP_MEMBERS
    };
};


export const getGroupMembers = (groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/members`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadGroupMembers(data));
    }
};

const initialState = {};

export const membersReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOAD_GROUP_MEMBERS: {
            const newState = { ...state };
            const membersObj = {};
            action.payload.Members.forEach(member => {
                membersObj[member.id] = member;
            });
            newState.members = membersObj

            return newState;
        }
        case CLEANUP_MEMBERS: {
            return initialState
        }


        default: {
            return state;
        }
    }
};

export default membersReducer;
