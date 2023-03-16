import React, { useState } from 'react'
import {Button, Grid,Paper,Avatar,Typography} from '@material-ui/core'
import { followUser, followingUser } from '../../../actions/users';
import { useDispatch } from 'react-redux';
import useStyle from './style'
function User({user}) {
   const classes=useStyle();
   const loginUser = JSON.parse(localStorage.getItem('user_info'));
   const userId = loginUser?.result.googleId || loginUser?.result?._id;
   
   const hasfollowed = user.followers.find((follower) => follower === userId);
   const [followers, setFollowers] = useState(user?.followers);
   const dispatch =useDispatch();


   const handelFollowers = async () => {
    dispatch(followUser(user._id));
  
    if (hasfollowed) {
      setFollowers(user.followers.filter((id) => id !== userId));
    } else {
      setFollowers([...user.followers, userId]);
    }
  };
  const Followers = () => {
  
      return followers.find((follower) => follower === userId)
        ? (
          <>UnFollow</>
        ) : (
          <>Follow</>
        );

  };

  return (
    <Paper className={classes.container} >
    <Grid container>
      <Grid item><Avatar  alt={user.firstName} src={user.profilePicture}  className={classes.profilePicture}>{user.firstName.charAt(0)}</Avatar>
      </Grid>
      <Grid item><Typography  className={classes.username}   >{user.firstName} {user.lastName}</Typography>
      </Grid>
      <Grid item style ={{ textAlign:"right"}} xs={12} sm={12} lg={12}> <Button  className={classes.followbtn} onClick={handelFollowers} > <Followers/> </Button>
    
      </Grid>
    </Grid>
   </Paper>
  )
}

export default User