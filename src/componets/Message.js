import { Avatar } from "@material-ui/core";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import "./Message.css";
import { selectUser } from "../features/userSlice";

const Message = forwardRef(
  ({ id, data: { timestamp, messages, photo, email, uid, displayName } }, ref) => {
    const user = useSelector(selectUser);

    return (
      <div
        ref={ref}
        className={`message ${user.email === email && `messageSender`}`}
      >
        <Avatar src={photo} className="messagePhoto" />
        <div className="messageContents">
          <p className="messageContent">{messages} </p>
          <small className="messageTimestamp">
            {new Date(timestamp?.toDate()).toLocaleString()}
          </small>
        </div>
      </div>
    );
  }
);

export default Message;
