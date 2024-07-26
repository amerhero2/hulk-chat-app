import HulkAxios from '../../axios/hulk.instance'
import Cookies from 'js-cookie';

export const SET_REGISTER_LOADING = 'SET_REGISTER_LOADING';
export const SET_LOGIN_LOADING = 'SET_LOGIN_LOADING';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SET_USER_DATA = 'SET_USER_DATA';
export const LOGOUT = 'LOGOUT';


export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: SET_REGISTER_LOADING });
  try {
    const response = await HulkAxios.post('/register', userData);
    dispatch({
      type: SET_USER_DATA,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response ? error.response.data : { message: 'Network error' },
    });
  }
};

export const loginUser = ({ email, password }) => async (dispatch) => {
  dispatch({ type: SET_LOGIN_LOADING });
  try {
    const response = await HulkAxios.post('/login', { email, password });
    Cookies.set('token', response.data.token, { expires: 5 });
    dispatch({
      type: SET_USER_DATA,
      payload: response.data,
    });
    
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response ? error.response.data : { message: 'Network error' },
    });
  }
};

export const setUserData = (user) => ({
  type: SET_USER_DATA,
  payload: user,
});

export const logoutUser = () => (dispatch) => {
  Cookies.remove('token');
  dispatch({
    type: LOGOUT,
  });
};