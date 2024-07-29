import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveRoom,
  setRoomMessages,
} from "../../redux/actions/chatActions";
import Messages from "../messages/messages";
import SendMessageInput from "../send-message-input/sendMessageInput";
import Button from "../common/button/Button";
import "./chatMainContent.css";

const ChatMainContent = () => {
  const dispatch = useDispatch();
  const { activeRoom } = useSelector((state) => state.chat);

  return (
    <div className="HULK-chat-main-content">
      {activeRoom && (
        <div className="HULK-chat-main-content-room-header">
          <span>Current room: {activeRoom.label}</span>
          <Button
            style={{ backgroundColor: "#F96C6C" }}
            onClick={() => {
              dispatch(setRoomMessages({ messages: [] }));
              dispatch(setActiveRoom({ room: null }));
            }}
          >
            Leave room
          </Button>
        </div>
      )}
      <Messages />
      <SendMessageInput />
    </div>
  );
};

export default ChatMainContent;
