import React from 'react'
import UseStyles from './style.js'
import SignInGIF from '../../images/social-media.gif'
import {Paper, Grid, Divider,Typography, Card,CardContent,Avatar} from '@material-ui/core'

function user() {

  const classes =UseStyles();
  const user = JSON.parse(localStorage.getItem('user_info'));
 
  if (!user?.result?.firstName) {
    return (
      <Paper style={{padding:"20px"}} elevation={6}>
        <Grid container>
          <Grid item><img  color="textSecondary" to="/" src={SignInGIF} alt="icon" height="50px" style={{ opacity:"0.5"}}/> </Grid>
          <Grid item style={{padding:"10px"}}> <Typography variant="h6" color="textSecondary" >Your not Sign In...</Typography></Grid>
        </Grid>
     
      </Paper>
    );
  }
  return (
    <Paper>
      <Card>
      <Grid container >
      <Grid item ><Avatar className={classes.purple} alt={user?.result.firstName} src={user?.result.profilePicture}>{user?.result.firstName.charAt(0)}</Avatar></Grid>
      <Grid item ><div className={classes.userName} > <Typography gutterBottom variant="h5" component="h2">{user?.result?.firstName} {user?.result?.lastName}</Typography></div> </Grid>
      </Grid>
      <Divider />
       <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">Followers {user?.result?.followers.length}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Following {user?.result?.following.length}</Typography>
        </CardContent>
      </Card>
    </Paper>
  )
}

export default user