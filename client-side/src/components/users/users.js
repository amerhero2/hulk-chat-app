import React, { useEffect } from "react";
import Divider from "../common/divider/divider";
import { useDispatch, useSelector } from "react-redux";
import "./users.css";
import { getUsers } from "../../redux/actions/chatActions";

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="HULK-chat-side-content-users-wrapper">
      <Divider label="Users" />
      <div className="HULK-chat-side-content-users">
        {users.map((user) => {
          return (
            <div key={user?.id} className="HULK-chat-side-content-users-user">
              <div>
                {user.firstName} {user.lastName}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
