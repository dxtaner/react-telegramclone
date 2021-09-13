import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import SearchIcon from "@material-ui/icons/Search";
import BorderColorOutlinedIcon from "@material-ui/icons/BorderColorOutlined";
import SidebarThread from "./SidebarThread";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import QuestionAnswerOutlinedIcon from "@material-ui/icons/QuestionAnswer";
import SettingsIcon from "@material-ui/icons/Settings";
import { Avatar, IconButton } from "@material-ui/core";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import database, { auth } from "../firebase";

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    database.collection("threadName").onSnapshot((snapshot) => {
      setThreads(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  },[]);

  const addThread = () => {
    const threadName = prompt("Enter thred name: ");
    database.collection("threadName").add({
      threadName: threadName,
    });
  };
  return (
    <div className="sidebar">
      <div className="sidebarHeader">
        <div className="sidebarSearch">
          <SearchIcon className="sidebarSearchIcon" />
          <input placeholder="...Search..." className="sidebarInput"></input>
        </div>
        <IconButton>
          <BorderColorOutlinedIcon
            onClick={addThread}
            className="siderbarColorIcon"
          ></BorderColorOutlinedIcon>
        </IconButton>
      </div>

      <div className="sidebarThreads">
        {threads.map(({ id, data: { threadName } }) => (
          <SidebarThread key={id} id={id} threadName={threadName} />
        ))}
      </div>

      <div className="sidebarButton">
        <Avatar
          onClick={() => auth.signOut()}
          className="sidebarButtonAvatar"
          src={user.photo}
        />
        <IconButton>
          <PhoneOutlinedIcon />
        </IconButton>
        <IconButton>
          <QuestionAnswerOutlinedIcon />
        </IconButton>

        <IconButton>
          <SettingsIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Sidebar;
