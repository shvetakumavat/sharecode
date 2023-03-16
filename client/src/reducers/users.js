import { FETCH_ALL_USERS, FOLLOW_USER } from '../constants/actionTypes';

export default (state =  { isLoading: true, users: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL_USERS:
       return {
          ...state,
          users: action.payload.data,
  
        };
    case FOLLOW_USER:
      return { ...state, users: state.users.map((user) => (user._id === action.payload._id ? action.payload : user)) };
   
     default :
       return state;
  
  }
};

