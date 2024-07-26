import {
    SET_REGISTER_LOADING,
    SET_LOGIN_LOADING,
    REGISTER_FAILURE,
    SET_USER_DATA,
    LOGIN_FAILURE,
    LOGOUT,
  } from '../actions/authActions';
  
  const initialState = {
    user: null,
    registerLoading: false,
    loginLoading: false,
    registerError: null,
    loginError: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_REGISTER_LOADING:
        return {
          ...state,
          registerLoading: true,
        };

      case SET_LOGIN_LOADING:
        return {
         ...state,
         loginLoading: true,
        };

      case SET_USER_DATA:
        return {
          ...state,
          user: action.payload.user,
          registerLoading: false,
          loginLoading: false,
        };

      case REGISTER_FAILURE:
        return {
          ...state,
          registerLoading: false,
          registerError: action.payload,
        };

      case LOGIN_FAILURE:
        return {
          ...state,
          loginLoading: false,
          loginError: action.payload,
        };
        
      case LOGOUT:
        return {
          ...state,
          user: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;