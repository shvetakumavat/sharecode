import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button ,Grid} from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import ShareCode from '../../images/ShareCode.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';
import { getPostsBySearch } from '../../actions/posts';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user_info')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('user_info')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="fixed" color="inherit">
      <Grid container justify="space-between" alignItems="center" spacing={3} >
        <Grid item  xs={12} sm={12} md={2}>
        <Link to="/" className={classes.brandContainer}>
        <img component={Link} to="/" src={ShareCode} alt="icon" height="45px" />
      </Link>
        </Grid>
      
        <Grid item  xs={12} sm={12} md={4} >
        <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.firstName} src={user?.result.profilePicture}>{user?.result.firstName.charAt(0)}</Avatar>
            <Typography  variant="h6" style={{marginLeft:'10px', color:'gray'}}>{user?.result.firstName}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
        </Grid>
      
      </Grid>
    </AppBar>
  );
};

export default Navbar;
