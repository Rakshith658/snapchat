import React, { useEffect } from 'react';
import './App.css';
import WebcamCapture from './webcamCapture';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Preview from './Preview';
import Chats from './Chats';
import ChatView from './ChatView';
import { useDispatch, useSelector } from 'react-redux';
import {login, logout, selectUser} from './features/appSlice'
import Login from './Login';
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((authUser)=>{
      if (authUser) {
        dispatch(login({
          username:authUser.displayName,
          profilePic:authUser.photoURL,
          id:authUser.uid
        }))
      }else{
        dispatch(logout())
      }
    })
  }, [dispatch])
  return (
    <div className="app">
      {/* <h1>lets build snapchat</h1> */}
      <Router>
        {!user ?(
          <Login/>
        ):(
          <>
          <img className="app__logo" src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg" alt=""/>
            <div className="app_body">
              <Switch>
                <Route  path="/chats/view">
                  <ChatView/>
                </Route>
                <Route  path="/chats">
                  <Chats/>
                </Route>
                <Route  path="/preview">
                  <Preview/>
                </Route>
                <Route exact path="/">
                  <WebcamCapture/>
                </Route>
              </Switch>
            </div>
          </>
      )} 
    </Router>
    </div>
  );
}

export default App;
