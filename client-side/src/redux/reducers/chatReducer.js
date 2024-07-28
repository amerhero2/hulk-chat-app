import {
  SET_ACTIVE_ROOM,
  SET_CHAT_ROOMS,
  SET_USERS_LIST,
  ADD_SINGLE_MESSAGE,
  CREATE_ROOM_SUCCESS,
  SET_CREATE_ROOM_MODAL_OPEN,
  GET_ROOMS_SUCCESS,
  SET_GET_ROOMS_LOADING,
} from "../actions/chatActions";

const initialState = {
  activeRoom: null,
  rooms: [],
  roomsLoading: false,
  users: false,
  messages: [],
  createRoomModalOpen: false,
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

    default:
      return state;
  }
};

export default chatReducer;
