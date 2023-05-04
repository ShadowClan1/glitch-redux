import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllUsers, getUserData } from "../redux/slices/chatscreen";
import { useDispatch } from "react-redux";

const LastChats = () => {
  const dispath = useDispatch();
  const lastChats = useSelector((state) => state.chatScreen.array);

  const setChat = (id) => {
    dispath(getUserData(id));
  };

  useEffect(() => {
    dispath(getAllUsers());
    
   

  }, []);

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="pl-5 text-lg text-white">Users</div>
        {lastChats?.map((e) => {
          return (
            <div
              key={e._id}
              className="px-5 text-white flex flex-row gap-2 hover:bg-white hover:text-purple-900 py-1"
              onClick={() => setChat(e._id)}
            >
              <img src="https://i.pinimg.com/736x/7c/ee/6f/7cee6fa507169843e3430a90dd5377d4.jpg" alt="alt" className="w-5 h-5 rounded-full" />
              <h1>{e.name}</h1>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LastChats;
