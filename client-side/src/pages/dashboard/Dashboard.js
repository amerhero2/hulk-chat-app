import React, { useEffect, useState } from "react";
import { useWebSocket } from "../../contexts/WebSocketContext";
import "./Dashboard.css";
import Button from "../../components/common/button/Button";
import Divider from "../../components/common/divider/divider";
import classNames from "classnames";
import {
  addSingleMessage,
  setActiveRoom,
  setCreateRoomModalOpen,
} from "../../redux/actions/chatActions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import RoomModal from "../../components/room-modal/roomModal";

const users = [
  { id: 1, firstName: "Amer", lastName: "Hero" },
  { id: 2, firstName: "Amer", lastName: "Rohe" },
  { id: 3, firstName: "Rohero", lastName: "Rosero" },
];

const Dashboard = () => {
  const socket = useWebSocket();
  const dispatch = useDispatch();
  const { activeRoom, messages, rooms, createRoomModalOpen } = useSelector(
    (state) => state.chat
  );
  const { user } = useSelector((state) => state.auth);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (socket && activeRoom) {
      socket.emit("joinRoom", activeRoom?.id);

      // Listen for messages from the room
      socket.on("message", (newMessage) => {
        console.log("NEW MESSAGE", newMessage);

        dispatch(
          addSingleMessage({
            message: newMessage,
          })
        );
      });

      return () => {
        socket.off("message");
      };
    }
  }, [socket, activeRoom, dispatch]);

  const activeRoomHandler = ({ room }) => {
    dispatch(setActiveRoom({ room }));
  };

  const handleSendMessage = () => {
    socket.emit("message", { room: activeRoom?.id, message: inputValue });

    console.log("user", user);
    setInputValue("");
  };

  return (
    <div className="HULK-chat">
      <div className="HULK-chat-side-content">
        <div className="HULK-chat-side-content-rooms-wrapper">
          <Button
            onClick={() => {
              dispatch(setCreateRoomModalOpen({ isOpen: true }));
            }}
          >
            + New room
          </Button>
          <Divider label="Rooms" />
          <RoomModal
            isOpen={createRoomModalOpen}
            onClose={() => {
              dispatch(setCreateRoomModalOpen({ isOpen: false }));
            }}
          />
          <div className="HULK-chat-side-content-rooms">
            {rooms.map((room) => {
              return (
                <div
                  key={room.id}
                  onClick={() => {
                    activeRoomHandler({ room });
                  }}
                  className={classNames("HULK-chat-side-content-rooms-room", {
                    "HULK-chat-side-content-rooms-room-active":
                      room.id === activeRoom?.id,
                  })}
                >
                  <div>{room.label}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="HULK-chat-side-content-users-wrapper">
          <Divider label="Users" />
          <div className="HULK-chat-side-content-users">
            {users.map((user) => {
              return (
                <div
                  key={user?.id}
                  className="HULK-chat-side-content-users-user"
                >
                  <div
                    className={classNames(
                      "HULK-chat-side-content-users-user-indicator",
                      {
                        "HULK-chat-side-content-users-user-indicator-active":
                          user.id === 1,
                      }
                    )}
                  />
                  <div>
                    {user.firstName} {user.lastName}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="HULK-chat-main-content">
        {activeRoom && (
          <div className="HULK-chat-main-content-room-header">
            <span>Current room: {activeRoom.label}</span>
            <Button style={{ backgroundColor: "#F96C6C" }}>Leave room</Button>
          </div>
        )}
        <div className="HULK-chat-main-content-messages">
          {!activeRoom && (
            <span className="HULK-chat-main-content-messages-no-room">
              Select a room to start chatting!
            </span>
          )}

          {!!activeRoom && !messages.length && (
            <span className="HULK-chat-main-content-messages-no-messages">
              Send a message and start chatting!
            </span>
          )}

          {messages.map((msg) => {
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
                  {moment().calendar()}
                </span>
                <span className="HULK-message-content">{msg.message}</span>
              </div>
            ) : (
              <span className="HULK-join-leave-message">{msg.message}</span>
            );
          })}
        </div>
        <div className="HULK-chat-main-content-message-input">
          <input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            placeholder="Type a message here..."
            disabled={!activeRoom}
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
      </div>
    </div>
  );
};

export default Dashboard;
