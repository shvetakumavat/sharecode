import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};


export const signinGoogle = (formData, router ) => async (dispatch)=>{
  try{
      // login user
      const {data} = await api.signInGoogle(formData)

      dispatch({type : AUTH, data})
      router.push('/');
  }catch(err){
      console.log(err)
  }
}

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};
export const signupGoogle = (formData, router) => async (dispatch)=>{
  try{
      

      const {data} = await api.signUpGoogle(formData)

      dispatch({type : AUTH, data})
      router.push('/')
  }catch(err){
      console.log(err)
  }
}