import styled from "styled-components";
import { IoArrowBackSharp } from "react-icons/io5";
import { MdSend } from "react-icons/md";
import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "./ChatContext";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import { Oval } from "react-loader-spinner";

// api constants to track status of api.
const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

export default function ChatContainer() {
  // Consuming Context Values here.
  const { selectedChat, setSelectedChat, socket, profile } =
    useContext(ChatContext);

  const chatContainerRef = useRef();

  // Using hooks for state management.
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);
  const [chatData, setChatData] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    // Api to get chats of profile and selectedChat user.
    const gettingChats = async () => {
      setApiStatus(apiConstants.inProgress);
      const apiUrl = `http://localhost:5000/my-chats?me=${profile.email}&to=${selectedChat.email}`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Cookies.get("chatToken")}`,
        },
      };

      const response = await fetch(apiUrl, options);
      if (response.ok) {
        const chatData = await response.json();
        setChatData(chatData);
        setApiStatus(apiConstants.success);
      } else {
        setApiStatus(apiConstants.failure);
      }
    };

    // Api to check wether selectedChat user is online or offline.
    const getOnlineStatus = async () => {
      const apiUrl = `http://localhost:5000/user-status?user=${selectedChat.email}`;
      const response = await fetch(apiUrl);
      const fetchdData = await response.json();
      const onlineStatus = fetchdData.isOnline;
      setIsOnline(onlineStatus);
    };

    // precaution if these are null or undefined.
    if (profile !== null && selectedChat !== null) {
      gettingChats();
      getOnlineStatus();
    }

    // Listening event to get message sent by selectedChat user.
    socket.on("privateMessage", (newMessage) => {
      setChatData((prevData) => [...prevData, newMessage]);
    });

    return () => {
      socket.off("privateMessage");
    };
  }, [selectedChat]);

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chatData]);

  const handleMessageSent = () => {
    const dateAndTime = new Date();
    const message = {
      id: uuidv4(),
      newMessage: messageInput,
      dateTime: dateAndTime,
      sentBy: profile.email,
      sentTo: selectedChat.email,
    };

    socket.emit("privateMessage", message, (ack) => {
      if (ack.success) {
        console.log(ack.message, ack.success);
      } else {
        console.error(ack.message, ack.success);
      }
    });
    setMessageInput("");
    setChatData((prevList) => [...prevList, message]);
  };

  const renderLoader = () => {
    return (
      <LoaderContainer>
        <Oval
          visible={true}
          height="100%"
          width="25"
          color="#fff"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        <p>Loading</p>
      </LoaderContainer>
    );
  };

  const renderFailureView = () => {
    return (
      <LoaderContainer>
        <p>Something went wrong</p>
      </LoaderContainer>
    );
  };

  const buildMessagesUi = (eachConversation) => {
    const { id, newMessage, dateTime, sentBy } = eachConversation;

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

  const renderSuccessView = () => {
    return (
      <>
        {chatData.map((eachConversation) => buildMessagesUi(eachConversation))}
      </>
    );
  };

  const renderAppropriateView = () => {
    switch (apiStatus) {
      case apiConstants.inProgress:
        return renderLoader();
      case apiConstants.success:
        return renderSuccessView();
      case apiConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  return (
    <MainContainer>
      {/* Header */}
      <UserHeaderContainer>
        <BackButton type="button" onClick={() => setSelectedChat(null)}>
          <IoArrowBackSharp />
        </BackButton>
        <DpContainer backgroundImage={selectedChat.imageUrl}></DpContainer>
        <InformationContainer>
          <Username>{selectedChat.name}</Username>
          <Status>{isOnline ? "Active" : "Offline"}</Status>
        </InformationContainer>
      </UserHeaderContainer>

      {/* Main */}
      <MainChatContainer ref={chatContainerRef}>
        {renderAppropriateView()}
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
  &:hover {
    background-color: white;
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
  height: calc(100vh - 205px);
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
  &:disabled {
    opacity: 0.2;
  }
  &:enabled:hover {
    background-color: white;
    border-radius: 5px;
    margin: 5px;
    height: 70%;
  }
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

const LoaderContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  p {
    color: #fff;
    margin-left: 5px;
  }
`;
