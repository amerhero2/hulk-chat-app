import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRooms,
  setActiveRoom,
  setRoomMessages,
} from "../../redux/actions/chatActions";
import classNames from "classnames";
import "./rooms.css";

const Rooms = () => {
  const dispatch = useDispatch();
  const { activeRoom, rooms } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  const activeRoomHandler = ({ room }) => {
    dispatch(setRoomMessages({ messages: [] }));
    dispatch(setActiveRoom({ room }));
  };

  return (
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
  );
};
export default Rooms;
