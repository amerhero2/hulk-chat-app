export const SET_CHAT_ROOMS = "SET_CHAT_ROOMS";
export const SET_ACTIVE_ROOM = "SET_ACTIVE_ROOM";
export const SET_USERS_LIST = "SET_USERS_LIST";
export const ADD_SINGLE_MESSAGE = "ADD_SINGLE_MESSAGE";

export const setActiveRoom = ({ id }) => ({
  type: SET_ACTIVE_ROOM,
  payload: id,
});

export const addSingleMessage = ({ message }) => ({
  type: ADD_SINGLE_MESSAGE,
  payload: message,
});
