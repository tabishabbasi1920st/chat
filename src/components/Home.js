import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import AllChat from "./AllChat.js";
import ChatContainer from "./ChatContainer.js";
import io from "socket.io-client";
import { ChatContext } from "./ChatContext.js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Header from "./Header.js";

export default function Home() {
  const navigate = useNavigate();

  const { profile, selectedChat, setSocket } = useContext(ChatContext);

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

const MainContainer = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
`;

const HybridContainer = styled.div`
  height: calc(100vh - 65px);
  width: 100%;
  overflow: hidden;
  @media screen and (min-width: 768px) {
    display: flex;
  }
`;

const FirstContainer = styled.div`
  display: ${(props) => (props.ischatselected ? "none" : "block")};
  @media screen and (min-width: 768px) {
    width: 320px;
    display: block;
  }
`;

const SecondContainer = styled.div`
  display: ${(props) => (props.ischatselected ? "block" : "none")};
  @media screen and (min-width: 768px) {
    width: calc(100% - 320px);
    display: block;
  }
`;

const EmptyContainer = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  background-color: #0f172a;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo-para {
    color: #fff;
    font-size: 40px;
    margin-bottom: 15px;
    font-weight: 600;
  }

  .info {
    text-align: center;
    color: #cbd5e1;
    font-size: 14px;
    font-weight: 500;
    width: 350px;
  }
`;
