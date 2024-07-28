import {
  SET_ACTIVE_ROOM,
  SET_CHAT_ROOMS,
  SET_USERS_LIST,
  ADD_SINGLE_MESSAGE,
  CREATE_ROOM_SUCCESS,
  SET_CREATE_ROOM_MODAL_OPEN,
  GET_ROOMS_SUCCESS,
  SET_GET_ROOMS_LOADING,
  GET_ROOM_MESSAGES_SUCCESS,
  SET_ROOM_MESSAGES,
  GET_USERS_SUCCESS,
  SET_GET_USERS_LOADING,
} from "../actions/chatActions";

const initialState = {
  activeRoom: null,
  rooms: [],
  roomsLoading: false,
  messages: [],
  hasMoreMessages: false,
  createRoomModalOpen: false,
  users: [],
  usersLoading: false,
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

    case SET_CREATE_ROOM_MODAL_OPEN:
      return {
        ...state,
        createRoomModalOpen: action.payload,
      };

    case CREATE_ROOM_SUCCESS:
      return {
        ...state,
        rooms: [...state.rooms, action.payload],
        activeRoom: action.payload,
        createRoomModalOpen: false,
      };

    case SET_GET_ROOMS_LOADING:
      return {
        ...state,
        roomsLoading: action.payload,
      };

    case GET_ROOMS_SUCCESS:
      return {
        ...state,
        rooms: action.payload,
        roomsLoading: false,
      };

    case SET_ROOM_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };

    case GET_ROOM_MESSAGES_SUCCESS:
      const newMessagesList = [...action.payload, ...state.messages];
      return {
        ...state,
        messages: newMessagesList,
        hasMoreMessages: action.payload.length < 20 ? false : true,
      };

    case SET_GET_USERS_LOADING:
      return {
        ...state,
        usersLoading: action.payload,
      };

    case GET_USERS_SUCCESS:
      console.log("action.payload", action.payload);
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};

export default chatReducer;
