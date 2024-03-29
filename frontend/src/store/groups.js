import { csrfFetch } from "./csrf";

//Actions
const LOAD_GROUPS = "groups/LOAD_GROUPS";
const ADD_GROUP = "groups/ADD_GROUP";
const UPDATE_GROUP = "groups/UPDATE_GROUP";
const DELETE_GROUP = "groups/DELETE_GROUP";
const ADD_GROUP_IMAGE = "groups/ADD_GROUP_IMAGE";
const GET_SINGLE_GROUP = "groups/GET_SINGLE_GROUP";


//Action Creators
export const loadGroups = (groups) => {
  return {
    type: LOAD_GROUPS,
    payload: groups,
  };
};



export const addGroup = (newGroup, newSingleGroup) => {
  return {
    type: ADD_GROUP,
    payload: { newGroup, newSingleGroup }
  };
};


export const update = (group) => {
  return {
    type: UPDATE_GROUP,
    payload: group,
  };
};


export const removeGroup = (groupId) => {
  return {
    type: DELETE_GROUP,
    payload: groupId,
  };
};

// export const addGroupImage = (image) => {
//   return {
//     type: ADD_GROUP_IMAGE,
//     payload: image
//   }
// }

export const getSingleGroup = (group) => {
  return {
    type: GET_SINGLE_GROUP,
    payload: group
  }
}

//thunks
export const getSingleGroupThunk = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`)

  if (response.ok) {
    const data = await response.json();
    dispatch(getSingleGroup(data))
    return data
  }
}

// export const addGroupImageThunk = (image, groupId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/groups/${groupId}/images`, {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(image),
//   })

//   if (response.ok) {
//     const data = await response.json();
//     dispatch(addGroupImage(data))
//     return data;
//   }
// }

export const getGroups = () => async (dispatch) => {
  const response = await csrfFetch("/api/groups");

  if (response.ok) {
    const data = await response.json();
    dispatch(loadGroups(data));
    return data
  }
};



export const createGroup = (group, image, sessionUser) => async (dispatch) => {

  const response = await csrfFetch("/api/groups", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(group),
  });

  if (response.ok) {
    const newGroup = await response.json();

    const response2 = await csrfFetch(`/api/groups/${newGroup.id}/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(image),
    })

    if (response2.ok) {
      const newImage = await response2.json();
      const newSingleGroup = { ...newGroup }
      newGroup['previewImage'] = newImage.url
      newSingleGroup['Organizer'] = sessionUser
      newSingleGroup['GroupImages'] = [newImage]
      dispatch(addGroup(newGroup, newSingleGroup))
      return newGroup
    }
  }
  return response
};


export const updateGroup = (groupId, group) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(group),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(update(data));
    return data;
  }
};


export const deleteGroup = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(removeGroup(data));
    return data;
  }
};
//initial store state
const initialState = {
  allGroups: {},
  singleGroup: {},
};

export const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GROUPS: {
      const newState = { allGroups: {}, singleGroup: {} }
      action.payload.Groups.forEach((group) => {
        newState.allGroups[group.id] = group;
      });
      return newState;
    }



    case ADD_GROUP: {
      const newState = { ...state, allGroups: { ...state.allGroups }, singleGroup: {} };
      newState.allGroups[action.payload.newGroup.id] = action.payload.newGroup;
      newState.singleGroup = action.payload.newSingleGroup
      return newState;
    }

    case UPDATE_GROUP: {
      const newState = { ...state };
      newState.groups = { ...state.groups, [action.payload.id]: action.payload }
      newState.singleGroup = { ...newState.singleGroup, ...action.payload }
      return newState;
    }

    case DELETE_GROUP: {
      const newState = { ...state, allGroups: { ...state.allGroups } };
      delete newState.allGroups[action.payload];

      return newState;
    }
    case ADD_GROUP_IMAGE: {
      const newState = { ...state, allGroups: { ...state.allGroups } };
      newState.allGroups[action.payload.groupId] = {
        ...newState[action.payload.id],
        previewImage: action.payload.image
      }
      return newState;
    }

    case GET_SINGLE_GROUP: {
      const newState = { allGroups: {}, singleGroup: {} };
      newState.singleGroup = action.payload
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default groupsReducer;
