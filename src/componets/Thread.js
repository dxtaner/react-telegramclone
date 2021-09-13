import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Message from "./Message";
import TimerIcon from "@material-ui/icons/Timer";
import SendIcon from "@material-ui/icons/Send";
import MicNoneIcon from "@material-ui/icons/MicNone";
import "./Thread.css";
import FlipMove from "react-flip-move";
import { useSelector } from "react-redux";
import database from "../firebase";
import firebase from "firebase";
import { selectThreadId, selectThreadName } from "../features/threadSlice";
import { selectUser } from "../features/userSlice";
import * as timeago from 'timeago.js';


function Thread() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const threadName = useSelector(selectThreadName);
  const threadId = useSelector(selectThreadId);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (threadId) {
      database
        .collection("threadName")
        .doc(threadId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [threadId]);

  const sendMessage = (e) => {
    e.preventDefault();

    database.collection("threadName").doc(threadId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      messages: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });

    setInput("");
  };

  return (
    <div className="thread">
      <div className="threadHeader">
        <div className="threadHeaderDetails">
          {threadId ? <Avatar src={user.photo} /> : <Avatar />}

          <div className="threadHeaderDetailsInfo">
            <h5> {threadId ? threadName : "Click on any chatname"} </h5>
            <small>{ threadId ? (timeago.format(messages[0]?.timestamp?.toDate())) : "last seen"}</small>
          </div>
        </div>
        <IconButton>
          <MoreHorizIcon className="threadHeaderMoreHoriz" />
        </IconButton>
      </div>

      <div className="threadMessages">
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message
              key = {id}
              id = {id}
              data = {data}
            />
          ))}
        </FlipMove>
      </div>

      <div className="threadInput">
        <form>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Enter a message..."
            type="text"
          />
          <IconButton>
            <TimerIcon />
          </IconButton>
          <IconButton>
            <SendIcon onClick={sendMessage} type="submit" />
          </IconButton>
          <IconButton>
            <MicNoneIcon />
          </IconButton>
        </form>
      </div>
    </div>
  );
}

export default Thread;
