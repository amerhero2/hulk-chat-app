import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useWebSocket } from "../../contexts/WebSocketContext";
import "./sendMessageInput.css";
import Button from "../common/button/Button";

const SendMessageInput = () => {
  const [inputValue, setInputValue] = useState("");
  const socket = useWebSocket();
  const { activeRoom } = useSelector((state) => state.chat);

  const handleSendMessage = () => {
    socket.emit("message", { room: activeRoom?.id, message: inputValue });
    setInputValue("");
  };

  return (
    <div className="HULK-chat-main-content-message-input">
      <input
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        placeholder="Type a message here..."
        disabled={!activeRoom}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSendMessage();
          }
        }}
      />
      <Button
        onClick={() => {
          handleSendMessage();
        }}
        disabled={!activeRoom}
      >
        Send
      </Button>
    </div>
  );
};
export default SendMessageInput;
