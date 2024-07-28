import React, { useState } from "react";
import "./roomModal.css";
import Button from "../common/button/Button";
import { createRoom } from "../../redux/actions/chatActions";
import { useDispatch } from "react-redux";

const RoomModal = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const handleAddRoom = () => {
    dispatch(createRoom({ label: inputValue }));
    setInputValue("");
  };

  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <span>Create a room</span>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            placeholder="Enter room name..."
          />
        </div>
        <div className="modal-footer">
          <Button onClick={onClose} style={{ backgroundColor: "#F96C6C" }}>
            Cancel
          </Button>
          <Button
            onClick={() => handleAddRoom()}
            disabled={inputValue.length < 1}
          >
            Add Room
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomModal;
