import React from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import moment from "moment";
import "./message.css";

const Message = ({ msg }) => {
  const { user } = useSelector((state) => state.auth);

  return msg.user?.id ? (
    <div
      key={msg.id}
      className={classNames("HULK-message", {
        "my-message": msg.user?.id === user?.id,
        "other-message": msg.user?.id !== user?.id,
      })}
    >
      <span className="HULK-message-user-info">
        {msg.user?.firstName} {msg.user?.lastName},{" "}
        {moment(msg?.created_at).calendar()}
      </span>
      <span className="HULK-message-content">{msg.message}</span>
    </div>
  ) : (
    <span className="HULK-join-leave-message">{msg.message}</span>
  );
};
export default Message;
