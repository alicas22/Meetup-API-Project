import { csrfFetch } from "./csrf";

const LOAD_GROUPS = "groups/LOAD_GROUPS";
const ADD_GROUP = "groups/ADD_GROUP";
const UPDATE_GROUP = "groups/UPDATE_GROUP";
const DELETE_GROUP = "groups/DELETE_GROUP";
const ADD_GROUP_IMAGE = "groups/ADD_GROUP_IMAGE";


export const loadGroups = (groups) => {
  return {
    type: LOAD_GROUPS,
    payload: groups,
  };
};


export const addGroup = (group) => {
  return {
    type: ADD_GROUP,
    payload: group,
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

export const addGroupImage = (image) =>{
  return {
    type: ADD_GROUP_IMAGE,
    payload: image
  }
}

//thunks
export const addGroupImageThunk = (image, groupId) => async(dispatch) =>{
  const response = await csrfFetch(`/api/groups/${groupId}/images`,{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(image),
  })

  if (response.ok){
    const data = await response.json();
    dispatch(addGroupImage(data))
    return data;
  }
}

export const getGroups = () => async (dispatch) => {
  const response = await csrfFetch("/api/groups");

  if (response.ok) {
    const data = await response.json();
    dispatch(loadGroups(data));
  }
};


export const createGroup = (group) => async (dispatch) => {

  const response = await csrfFetch("/api/groups", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(group),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addGroup(data));
    return data;
  }
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
    dispatch(removeGroup(groupId));
    return data;
  }
};

const initialState = {};

export const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GROUPS: {
      const allGroups = {};
      action.payload.Groups.forEach((group) => {
        allGroups[group.id] = group;
      });
      return {
        ...allGroups,
      };
    }

    case ADD_GROUP: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }

    case UPDATE_GROUP: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }

    case DELETE_GROUP: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default groupsReducer;
