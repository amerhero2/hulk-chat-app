import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSingleMessage,
  addSingleRoom,
  getRoomMessages,
} from "../../redux/actions/chatActions";
import _ from "lodash";

import "./messages.css";
import { useWebSocket } from "../../contexts/WebSocketContext";
import Message from "../message/message";

const Messages = () => {
  const dispatch = useDispatch();
  const messagesContainerRef = useRef(null);
  const socket = useWebSocket();

  const { activeRoom, messages, hasMoreMessages } = useSelector(
    (state) => state.chat
  );

  useEffect(() => {
    if (!activeRoom) return;
    dispatch(getRoomMessages({ roomId: activeRoom.id }));
  }, [dispatch, activeRoom]);

  const handleScroll = _.debounce(() => {
    if (messagesContainerRef.current && activeRoom) {
      const { scrollTop } = messagesContainerRef.current;
      if (scrollTop === 0 && hasMoreMessages) {
        dispatch(
          getRoomMessages({ roomId: activeRoom.id, offset: messages.length })
        );
      }
    }
  }, 300);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
      handleScroll.cancel();
    };
  }, [dispatch, activeRoom, messages, hasMoreMessages, handleScroll]);

  useEffect(() => {
    if (messages.length <= 20) {
      messagesContainerRef.current?.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    if (socket) {
      if (activeRoom) {
        socket.emit("joinRoom", activeRoom?.id);

        socket.on("message", (newMessage) => {
          dispatch(
            addSingleMessage({
              message: { id: socket.id, ...newMessage },
            })
          );
        });
      }

      socket.on("roomCreated", (newRoom) => {
        dispatch(addSingleRoom({ room: newRoom.room }));
      });

      return () => {
        socket.off("message");
      };
    }
  }, [socket, activeRoom, dispatch]);

  return (
    <div className="HULK-chat-main-content-messages" ref={messagesContainerRef}>
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
        return <Message msg={msg} />;
      })}
    </div>
  );
};

export default Messages;
