import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarThread.css";
import database from "../firebase";
import { useDispatch } from "react-redux";
import { setThread } from "../features/threadSlice";

function SidebarThread({ id, threadName }) {
  const dispatch = useDispatch();
  const [threadInfo, setThreadInfo] = useState([]);

  useEffect(() => {
    database
      .collection("threadName")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setThreadInfo(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);

  return (
    <div
      onClick={() =>
        dispatch(
          setThread({
            threadId: id,
            threadName: threadName
          })
        )
      }
      className="sidebarThread"
    >
      <Avatar src={threadInfo[0]?.photo} />
      <div className="sidebarThreadDetails">
        <h4>{threadName}</h4>
        <p>{threadInfo[0]?.message}</p>
        <p>
          <small className="sidebarThreadTimestamp">
            {new Date(threadInfo[0]?.timestamp?.toDate()).toLocaleString()}
          </small>
        </p>
      </div>
    </div>
  );
}

export default SidebarThread;
