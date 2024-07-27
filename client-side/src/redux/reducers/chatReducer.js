import {
  SET_ACTIVE_ROOM,
  SET_CHAT_ROOMS,
  SET_USERS_LIST,
  ADD_SINGLE_MESSAGE,
} from "../actions/chatActions";

const initialState = {
  activeRoom: null,
  rooms: false,
  users: false,
  messages: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_ROOM:
      return {
        ...state,
        activeRoom: action.payload,
      };

    case SET_CHAT_ROOMS:
      return {
        ...state,
        rooms: action.payload,
      };

    case SET_USERS_LIST:
      return {
        ...state,
        users: action.payload,
      };

    case ADD_SINGLE_MESSAGE:
      const messages = [...state.messages, action.payload];

      console.log("messages", messages);
      return {
        ...state,
        messages,
      };

    default:
      return state;
  }
};

export default chatReducer;
