import React from "react";
import { useSelector } from "react-redux";
import useIsMobile from "../../hooks/useIsMobile";

import ChatSideContent from "../../components/chat-side-content/chatSideContent";
import ChatMainContent from "../../components/chat-main-content/chatMainContent";

import "./Dashboard.css";

const Dashboard = () => {
  const isMobile = useIsMobile();
  const { activeRoom } = useSelector((state) => state.chat);

  return (
    <div className="HULK-chat">
      {(!isMobile || (isMobile && !activeRoom)) && <ChatSideContent />}
      {(!isMobile || (isMobile && activeRoom)) && <ChatMainContent />}
    </div>
  );
};

export default Dashboard;
