import React, { useEffect, useState } from "react";
import { useWebSocket } from "../../contexts/WebSocketContext";
import "./Dashboard.css";
import Button from "../../components/common/button/Button";
import Divider from "../../components/common/divider/divider";
import classNames from "classnames";
import {
  addSingleMessage,
  setActiveRoom,
} from "../../redux/actions/chatActions";
import { useDispatch, useSelector } from "react-redux";

const rooms = [
  { id: 1, label: "My test room" },
  { id: 2, label: "My test two" },
  { id: 3, label: "My test three" },
];
const users = [
  { id: 1, firstName: "Amer", lastName: "Hero" },
  { id: 2, firstName: "Amer", lastName: "Rohe" },
  { id: 3, firstName: "Rohero", lastName: "Rosero" },
];

const Dashboard = () => {
  const socket = useWebSocket();
  const dispatch = useDispatch();
  const { activeRoom, messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (socket && activeRoom) {
      socket.emit("joinRoom", activeRoom);

      // Listen for messages from the room
      socket.on("message", (newMessage) => {
        console.log("NEW MESSAGE", newMessage);
      });

      return () => {
        socket.off("message");
      };
    }
  }, [socket, activeRoom]);

  const activeRoomHandler = ({ id }) => {
    dispatch(setActiveRoom({ id }));
  };

  const handleSendMessage = () => {
    socket.emit("message", { room: activeRoom, message: inputValue });

    console.log("user", user);
    dispatch(
      addSingleMessage({
        message: {
          id: Math.random(),
          userId: user?.id,
          message: inputValue,
        },
      })
    );
    setInputValue("");
  };

  return (
    <div className="HULK-chat">
      <div className="HULK-chat-side-content">
        <div className="HULK-chat-side-content-rooms-wrapper">
          <Button>+ New room</Button>
          <Divider label="Rooms" />
          <div className="HULK-chat-side-content-rooms">
            {rooms.map((room) => {
              return (
                <div
                  key={room.id}
                  onClick={() => {
                    activeRoomHandler({ id: room?.id });
                  }}
                  className={classNames("HULK-chat-side-content-rooms-room", {
                    "HULK-chat-side-content-rooms-room-active":
                      room.id === activeRoom,
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
        <div className="HULK-chat-main-content-messages">
          <div className="HULK-message my-message">Your message goes here</div>
          <div className="HULK-message other-message">
            Other's message goes here
          </div>
          <div className="HULK-message my-message">
            Another one of your dfasdfas df as df as df asd fa sdf as df as df
            as dsa sadf a s asdfa sdf asdf as df asdf as df sadf asd fas fasdf
            as df asdf as dmessages
          </div>
          <div className="HULK-message other-message">
            Another message from others
          </div>

          {messages.map((msg) => {
            return (
              <div
                key={msg.id}
                className={classNames("HULK-message", {
                  "my-message": msg.userId === user?.id,
                  "other-message": msg.userId !== user?.id,
                })}
              >
                {msg.message}
              </div>
            );
          })}
        </div>
        <div className="HULK-chat-main-content-message-input">
          <input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            placeholder="Type a message here..."
          />
          <Button
            onClick={() => {
              handleSendMessage();
            }}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
