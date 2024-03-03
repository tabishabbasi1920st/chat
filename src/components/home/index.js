import AllChat from "../AllChats";
import ChatContainer from "../ChatContainer";
import Header from "../Header";
import io from "socket.io-client";
import { ChatContext } from "../Context/ChatContext.js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import FullImageModal from "../FullImageModal";
import {
  MainContainer,
  HybridContainer,
  FirstContainer,
  SecondContainer,
  EmptyContainer,
} from "./styledComponent";

export default function Home() {
  const navigate = useNavigate();

  const {
    profile,
    selectedChat,
    setSocket,
    fullImageModal,
    setFullImageModal,
  } = useContext(ChatContext);

  useEffect(() => {
    if (Cookies.get("chatToken") === undefined) {
      return navigate("/login", { replace: true });
    }

    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    if (profile !== null) {
      newSocket.emit("setEmail", profile.email);
    }

    return () => {
      newSocket.disconnect();
    };
  }, [profile]);

  const renderEmptyChatContainer = () => {
    return (
      <EmptyContainer>
        <p className="logo-para">ConnectMe</p>
        <p className="info">
          Send and receive messages without keeping your phone online.
          <br />
          Use ConnectMe whenever and wherever your are in the world.
        </p>
      </EmptyContainer>
    );
  };

  return (
    <MainContainer>
      {fullImageModal && <FullImageModal/>}
      <Header />
      <HybridContainer>
        <FirstContainer ischatselected={selectedChat}>
          <AllChat />
        </FirstContainer>
        <SecondContainer ischatselected={selectedChat}>
          {!selectedChat && renderEmptyChatContainer()}
          {selectedChat && <ChatContainer />}
        </SecondContainer>
      </HybridContainer>
    </MainContainer>
  );
}
