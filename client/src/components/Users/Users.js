import React from 'react'
import { Grid, CircularProgress, Paper } from '@material-ui/core';
import User from './User/User';
import UseStyles from './style';
import { useSelector } from 'react-redux';


function Users() {
  

  const loginUser = JSON.parse(localStorage.getItem('user_info'));
const { users, isLoading }= useSelector((state) => state.users);

const userId = loginUser?.result.googleId || loginUser?.result?._id;
const newList=[];


if (!loginUser?.result?.firstName) {
  return (
    <></>
  );
}

users.map((user)=>{

  if(user._id !== userId)
{
  newList.push(user)
}
})


const classes=UseStyles();

  return (
   !newList.length? <CircularProgress /> : (
      <Paper className={classes.container} >
       <Grid container alignItems="stretch" spacing={3}>
   
         {newList?.map((user) => 
           <Grid key={user._id} item xs={12} sm={12} md={12} lg={12}>
             <User user={user} />
           </Grid>
         )}
       </Grid>
      </Paper> 
     )
  );




  
}

export default Users;