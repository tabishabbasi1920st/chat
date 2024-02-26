import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import AllChat from "./AllChat.js";
import ChatContainer from "./ChatContainer.js";
import io, { Socket } from "socket.io-client";
import { ChatContext } from "./ChatContext.js";

export default function Home() {
  const {
    profile,
    selectedChat,
    setSocket,
    conversationList,
    setConversationList,
  } = useContext(ChatContext);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    newSocket.on("privateMessage", (newMessage) => {
      const dateAndTime = new Date();
      setConversationList((prevList) => [
        ...prevList,
        { received: { newMessage: newMessage, dateTime: dateAndTime } },
      ]);
    });

    newSocket.emit("setEmail", profile.email);

    return () => {
      newSocket.disconnect();
    };
  }, []);

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
      <FirstContainer isChatSelected={selectedChat}>
        <AllChat />
      </FirstContainer>
      <SecondContainer isChatSelected={selectedChat}>
        {!selectedChat && renderEmptyChatContainer()}
        {selectedChat && <ChatContainer />}
      </SecondContainer>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  width: 100%;
  overflow: hidden;
  @media screen and (min-width: 768px) {
    display: flex;
  }
`;

const FirstContainer = styled.div`
  display: ${(props) => (props.isChatSelected ? "none" : "block")};
  @media screen and (min-width: 768px) {
    width: 320px;
    display: block;
  }
`;

const SecondContainer = styled.div`
  display: ${(props) => (props.isChatSelected ? "block" : "none")};
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
