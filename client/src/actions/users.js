import { FETCH_ALL_USERS,FOLLOW_USER} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getUsers = () => async (dispatch) => {
    try {

      const { data }  = await api.fetchUsers();

      dispatch({ type: FETCH_ALL_USERS, payload:data});
  
    } catch (error) {
      console.log(error);
    }
  };


  export const followUser = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('user_info'));
  
    try {
      const { data } = await api.followUser(id, user?.token);
  
      dispatch({ type: FOLLOW_USER, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
