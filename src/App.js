import React, { useEffect } from "react";
import { auth } from "./firebase";
import Telegram from "./componets/Telegram";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import Login from "./componets/Login";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          uid:authUser.uid, // profil idsi
          photo:authUser.photoURL, // profil fotosu
          displayName:authUser.displayName, // profil ad
          email:authUser.email, // profil email
        }));
      } else {
        dispatch(logout());
      }
     // console.log(authUser);
    });
  },[dispatch]);

  return <div className="App">{user ? <Telegram /> : <Login />}</div>;
}

export default App;
