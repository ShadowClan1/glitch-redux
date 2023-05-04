import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FooterBox from "./FooterBox";
import Messages from "./Messages";
import {
  addMessageToArray,
  getChat,
  getGroupChat,
} from "../redux/slices/messages";
import { getUser } from "../localstorage manger/localstorage";
import { socket } from "../socket.io/socket";
import Multipurpose from "./Multipurpose";
import { htmlParser } from "../common/htmlparser";
import { socketPrivateMessges } from "../socket.io/functions";
import { useLocation, useNavigate } from "react-router-dom";

const ChatScreen = () => {
  const navigate = useNavigate();
  const screen = useSelector((state) => state.chatScreen.single);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.array);
  const [metaData, setMetaData] = useState({ typing: "" });
  const { pathname } = useLocation();
  const [variable, setVariable] = useState(screen);

  useEffect(() => {
    // setInterval(()=>{
    //   console.log(variable,'chatScreen')
    // }, 3000)


    

  }, []);

  // const path = pathname.split('/')
  useEffect(() => {
    console.log("im changing");
    if (screen.type == "CHAT") {
      console.log("i was hit by a truck", screen.type, screen);
      console.log(screen);
      socket.on("TYPING_R", (data) => {
        console.log(data);
      });

      // setTimeout()
      // setInterval ( ()=>  {  console.log(screen.type );} , 300)
    }

    if (screen.type == "CHAT") {
      dispatch(getChat({ From: screen.data._id, To: getUser()._id }));
    }
    if (screen.type == "GROUP") {
      dispatch(getGroupChat({ ToGroup: screen.data._id }));
    }
  }, [screen.data._id]);

  // useEffect(() => {
  // socket.on("PRIVATE_MESSAGE_R", (data) => {
  //   console.log(screen.data._id, data.From._id, screen, "Private");

  //   if (screen.data._id == data.From._id) {
  //     dispatch(addMessageToArray(data));
  //   }
  // });
  socket.on("GROUP_MESSAGE_R", (data) => {
    if (screen.data._id == data.ToGroup) {
      dispatch(addMessageToArray(data));
    }
  });
  socketPrivateMessges(screen, dispatch);
  socket.on("TYPING_R", (data) => {
    console.log(screen.type, "current screen");
    // if (data.type == "CHAT") { console.log(data.From._id, path[3])
    // // if (data.type == "CHAT") {
    //   // console.log(screen.data._id == data.From._id);

    //   // if (screen.data._id == data.From._id) {
    //   if (path[3] == data.From._id) {
    //     setMetaData({
    //       ...metaData,
    //       typing: `${data.messageText}`,
    //     });
    //     setTimeout(() => {
    //       setMetaData({ ...metaData, typing: "" });
    //     }, 2000);
    //   }
    // }
    // if (data.type == "GROUP") {
    //   console.log(screen.data._id == data.To._id);

    //   if (screen.data._id == data.From._id) {
    //     setMetaData({
    //       ...metaData,
    //       typing: `${data?.From?.name} is writing ${data.messageText}`,
    //     });
    //     setTimeout(() => {
    //       setMetaData({ ...metaData, typing: "" });
    //     }, 2000);
    //   }
    // }
  });
  // }, [screen.data._id]);

  return (
    <div className="flex flex-col relative">
      screent type {screen.type}
      {(screen.type == "CHAT" || screen.type == "GROUP") && (
        <>
          <div className=" px-4 ">
            {" "}
            <span className="text-xl">
              {" "}
              {screen.data.name.toUpperCase()}{" "}
            </span>{" "}
          </div>
          <div className="text-xs slate-300">{htmlParser(metaData.typing)}</div>
          <Messages messages={messages} />
          <FooterBox />{" "}
        </>
      )}
      {screen.type == "CREATE_GROUP" && (
        <>
          <div className="name px-4 ">Create Group</div>

          <Multipurpose />
          {/* <Messages messages={messages} />
          <FooterBox />{" "} */}
        </>
      )}
    </div>
  );
};

export default ChatScreen;
