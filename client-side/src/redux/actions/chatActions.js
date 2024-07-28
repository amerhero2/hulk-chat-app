import HulkAxios from "../../axios/hulk.instance";

export const SET_CHAT_ROOMS = "SET_CHAT_ROOMS";
export const SET_ACTIVE_ROOM = "SET_ACTIVE_ROOM";
export const SET_USERS_LIST = "SET_USERS_LIST";
export const ADD_SINGLE_MESSAGE = "ADD_SINGLE_MESSAGE";
export const SET_CREATE_ROOM_LOADING = "SET_NEW_ROOM_LOADING";
export const CREATE_ROOM_SUCCESS = "CREATE_ROOM_SUCCESS";
export const CREATE_ROOM_FAILURE = "CREATE_ROOM_FAILURE";
export const SET_CREATE_ROOM_MODAL_OPEN = "SET_CREATE_ROOM_MODAL_OPEN";
export const SET_GET_ROOMS_LOADING = "SET_GET_ROOMS_LOADING";
export const GET_ROOMS_SUCCESS = "GET_ROOMS_SUCCESS";
export const GET_ROOMS_FAILURE = "GET_ROOMS_FAILURE";
export const SET_ROOM_MESSAGES_LOADING = "SET_ROOM_MESSAGES_LOADING";
export const SET_ROOM_MESSAGES = "SET_ROOM_MESSAGES";
export const GET_ROOM_MESSAGES_SUCCESS = "GET_ROOM_MESSAGES_SUCCESS";
export const GET_ROOM_MESSAGES_FAILURE = "GET_ROOM_MESSAGES_FAILURE";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILURE = "GET_USERS_FAILURE";
export const SET_GET_USERS_LOADING = "SET_GET_USERS_LOADING";

export const createRoom = ({ label }) => {
  return async (dispatch) => {
    dispatch({ type: SET_CREATE_ROOM_LOADING });
    try {
      const response = await HulkAxios.post("/room", { label });
      dispatch({
        type: CREATE_ROOM_SUCCESS,
        payload: response.data.room,
      });
    } catch (error) {
      dispatch({
        type: CREATE_ROOM_FAILURE,
        payload: error.response
          ? error.response.data
          : { message: "Network error" },
      });
    }
  };
};

export const getRooms = () => {
  return async (dispatch) => {
    dispatch({ type: SET_GET_ROOMS_LOADING });
    try {
      const response = await HulkAxios.get("/rooms");
      dispatch({
        type: GET_ROOMS_SUCCESS,
        payload: response.data?.rooms,
      });
    } catch (error) {
      dispatch({
        type: GET_ROOMS_FAILURE,
        payload: error.response
          ? error.response.data
          : { message: "Network error" },
      });
    }
  };
};

export const getUsers = () => {
  return async (dispatch) => {
    dispatch({
      type: SET_GET_USERS_LOADING,
      payload: true,
    });
    try {
      const response = await HulkAxios.get("/users");
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: response.data?.users,
      });
    } catch (error) {
      dispatch({
        type: GET_USERS_FAILURE,
        payload: error.response
          ? error.response.data
          : { message: "Network error" },
      });
    }
  };
};

export const getRoomMessages = ({ roomId, offset = 0 }) => {
  return async (dispatch) => {
    dispatch({ type: SET_ROOM_MESSAGES_LOADING });
    try {
      const response = await HulkAxios.get(
        `/messages?roomId=${roomId}&offset=${offset}&limit=20`
      );

      dispatch({
        type: GET_ROOM_MESSAGES_SUCCESS,
        payload: response.data?.messages?.messages,
      });
    } catch (error) {
      dispatch({
        type: GET_ROOM_MESSAGES_FAILURE,
        payload: error.response
          ? error.response.data
          : { message: "Network error" },
      });
    }
  };
};

export const setActiveRoom = ({ room }) => ({
  type: SET_ACTIVE_ROOM,
  payload: room,
});

export const addSingleMessage = ({ message }) => ({
  type: ADD_SINGLE_MESSAGE,
  payload: message,
});

export const setCreateRoomModalOpen = ({ isOpen }) => ({
  type: SET_CREATE_ROOM_MODAL_OPEN,
  payload: isOpen,
});

export const setRoomMessages = ({ messages }) => ({
  type: SET_ROOM_MESSAGES,
  payload: messages,
});
