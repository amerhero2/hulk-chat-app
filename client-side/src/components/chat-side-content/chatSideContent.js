import React from "react";
import RoomModal from "../room-modal/roomModal";
import { setCreateRoomModalOpen } from "../../redux/actions/chatActions";
import { useDispatch, useSelector } from "react-redux";
import Rooms from "../rooms/rooms";
import Users from "../users/users";
import Button from "../common/button/Button";
import Divider from "../common/divider/divider";

const ChatSideContent = () => {
  const dispatch = useDispatch();

  const { createRoomModalOpen } = useSelector((state) => state.chat);

  return (
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
        <Rooms />
      </div>
      <Users />
    </div>
  );
};

export default ChatSideContent;
