import React,{useEffect} from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import useStayle from "./styles"
import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';
import { useDispatch } from 'react-redux';
import {getUsers} from '../src/actions/users';
const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const classes=useStayle()
  const dispatch=useDispatch();
  useEffect (
    ()=>{
      dispatch(getUsers())
    },[dispatch]
  )



  return (
   <BrowserRouter>
       
      <Container maxWidth="xl">
      <Navbar />
     
      <Container maxWidth="xl" className={classes.container} position="static"><Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/user/fetchusers" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
        </Switch></Container>
        
      </Container>
    </BrowserRouter>
 
  );
};

export default App;
