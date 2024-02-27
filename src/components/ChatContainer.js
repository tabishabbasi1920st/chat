import styled from "styled-components";
import { IoArrowBackSharp } from "react-icons/io5";
import { MdSend } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "./ChatContext";
import { v4 as uuidv4 } from "uuid";

export default function ChatContainer() {
  const {
    selectedChat,
    setSelectedChat,
    socket,
    conversationList,
    setConversationList,
    profile,
    getChats,
  } = useContext(ChatContext);

  useEffect(() => {
    const data = getChats(profile.email, selectedChat.email);
    setChatData(data);
    console.log(data);
  }, [conversationList, selectedChat]);

  const [messageInput, setMessageInput] = useState("");
  const [chatData, setChatData] = useState([]);

  const { imageUrl } = selectedChat;

  const handleMessageSent = () => {
    const dateAndTime = new Date();
    const message = {
      id: uuidv4(),
      newMessage: messageInput,
      dateTime: dateAndTime,
      sentBy: profile.email,
      sentTo: selectedChat.email,
    };

    socket.emit("privateMessage", message);
    setMessageInput("");
    setConversationList((prevList) => [...prevList, message]);
  };

  const buildMessagesUi = (eachConversation) => {
    const { id, newMessage, dateTime, sentBy, sentTo } = eachConversation;

    const dt = new Date(dateTime);
    const hour = dt.getHours();
    const formattedHours = hour % 12 || 12; // convert to 12-hour format.
    const amOrPm = hour < 12 ? "AM" : "PM";
    const minutes = dt.getMinutes().toLocaleString();

    if (sentBy === profile.email) {
      return (
        <SentMessage key={id}>
          <p className="text-message">{newMessage}</p>
          <p className="text-message-time">{`${formattedHours}:${minutes}${amOrPm}`}</p>
        </SentMessage>
      );
    }
    if (sentBy === selectedChat.email) {
      return (
        <ReceivedMessage key={id}>
          <p className="text-message">{newMessage}</p>
          <p className="text-message-time">{`${formattedHours}:${minutes}${amOrPm}`}</p>
        </ReceivedMessage>
      );
    }
  };

  return (
    <MainContainer>
      {/* Header */}
      <UserHeaderContainer>
        <BackButton type="button" onClick={() => setSelectedChat(null)}>
          <IoArrowBackSharp />
        </BackButton>
        <DpContainer backgroundImage={imageUrl}></DpContainer>
        <InformationContainer>
          <Username>{selectedChat.name}</Username>
          <Status>Active</Status>
        </InformationContainer>
      </UserHeaderContainer>

      {/* Main */}
      <MainChatContainer>
        {chatData.map((eachConversation) => buildMessagesUi(eachConversation))}
      </MainChatContainer>

      {/* Footer */}
      <UserFooterContainer>
        <MessageInput
          placeholder="Type a message..."
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <SendButton
          disabled={messageInput === ""}
          type="button"
          onClick={handleMessageSent}
        >
          <MdSend />
        </SendButton>
      </UserFooterContainer>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  height: 100vh;
  width: 100%;
`;

const UserHeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #132036;
  border-bottom: 1px solid #334155;
  @media screen and (min-width: 768px) {
    padding-left: 10px;
  }
`;

const BackButton = styled.button`
  height: 100%;
  width: 40px;
  margin-right: 5px;
  font-size: 20px;
  background-color: transparent;
  border: none;
  color: #475569;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0px 10px;
  justify-content: space-between;
`;

const Username = styled.p`
  font-weight: 500;
  color: #cbd5e1;
  font-size: 14px;
`;

const Status = styled.p`
  font-size: 12px;
  color: #94a3b8;
`;

const MainChatContainer = styled.div`
  height: calc(100vh - 140px);
  width: 100%;
  overflow-y: scroll;
  background-color: #0f172a;
  padding: 0px 10px 0px 10px;
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #070b15;
  }
`;

const UserFooterContainer = styled.div`
  height: 70px;
  width: 100%;
  background-color: #132036;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  border-top: 1px solid #334155;
  @media screen and (min-width: 768px) {
    padding-left: 10px;
  }
`;

const SendButton = styled.button`
  height: 40px;
  width: 60px;
  font-size: 30px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  color: #94a3b8;
  cursor: pointer;
`;

const MessageInput = styled.input`
  height: 50px;
  background-color: #0f172a;
  border: none;
  border-radius: 5px;
  outline: none;
  flex-grow: 1;
  flex-shrink: 0;
  color: #94a3b8;
  font-size: 16px;
  padding: 5px 10px;

  &::placeholder {
    color: #94a3b8;
  }
`;

const DpContainer = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 5px;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
`;

const SentMessage = styled.div`
  padding: 10px;
  color: #fff;
  max-width: 85%;
  margin-left: auto;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #2563eb;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .text-message {
    font-size: 14px;
  }

  .text-message-time {
    font-size: 11px;
    color: #94a3b8;
  }
`;

const ReceivedMessage = styled.div`
  padding: 10px;
  color: #fff;
  max-width: 85%;
  margin-right: auto;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #132036;

  .text-message {
    font-size: 14px;
  }

  .text-message-time {
    font-size: 11px;
    color: #94a3b8;
  }
`;
