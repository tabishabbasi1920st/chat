import styled from "styled-components";
import { IoArrowBackSharp } from "react-icons/io5";
import { MdSend } from "react-icons/md";
import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "./ChatContext";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import { Oval } from "react-loader-spinner";
import { FaSearch } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { IoMdClose } from "react-icons/io";

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
  const [isChatSearchFocus, setIsChatSearchFocus] = useState(false);
  const [chatSearchInput, setChatSearchInput] = useState("");
  const [showHideChatSearch, setShowHideChatSearch] = useState(false);

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
          <SenderDp backgroundImage={selectedChat.imageUrl}></SenderDp>
          <div className="sender-msg-container">
            <p className="text-message">{newMessage}</p>
            <p className="text-message-time">{`${formattedHours}:${minutes}${amOrPm}`}</p>
          </div>
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

  const renderChatSearch = () => {
    return (
      <ChatSearchContainer>
        <InnerContainer isChatSearchFocus={isChatSearchFocus}>
          <button className="lens-btn">
            <FaSearch />
          </button>
          <input
            type="search"
            placeholder="Search in this chat"
            value={chatSearchInput}
            onFocus={() => setIsChatSearchFocus(true)}
            onBlur={() => setIsChatSearchFocus(false)}
            onChange={(e) => setChatSearchInput(e.target.value)}
          />
        </InnerContainer>

        <button className="arrow-btn">
          <MdOutlineKeyboardArrowUp />
        </button>
        <button className="arrow-btn">
          <MdOutlineKeyboardArrowDown />
        </button>
        <button
          onClick={() => setShowHideChatSearch(false)}
          className="arrow-btn"
          style={{ backgroundColor: "#203047" }}
        >
          <IoMdClose />
        </button>
      </ChatSearchContainer>
    );
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
        <HeaderOptionsContainer>
          <li>
            <SearchChatBtn onClick={() => setShowHideChatSearch(true)}>
              <FaSearch />
            </SearchChatBtn>
          </li>
        </HeaderOptionsContainer>
      </UserHeaderContainer>
      {showHideChatSearch && renderChatSearch()}
      {/* Main */}
      <MainChatContainer
        ref={chatContainerRef}
        style={{
          height: `calc(100vh - ${showHideChatSearch ? "255" : "205"}px)`,
        }}
      >
        {renderAppropriateView()}
      </MainChatContainer>

      {/* Footer */}
      <UserFooterContainer>
        <MessageInput
          placeholder="Type a message..."
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleMessageSent();
            }
          }}
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
  width: 100%;
  overflow-y: scroll;
  background-color: #0f172a;
  padding: 0px 10px 0px 10px;
  display: flex;
  flex-direction: column;
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
    padding-right: 10px;
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
  @media screen and (min-width: 768px) {
    display: none;
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
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #0f172a;
  display: flex;
  gap: 10px;

  .text-message {
    font-size: 14px;
  }

  .text-message-time {
    font-size: 11px;
    color: #94a3b8;
  }

  .sender-msg-container {
    background-color: #132036;
    border-radius: 10px;
    padding: 10px;
    /* border: 2px solid red; */
  }
`;

const SenderDp = styled.div`
  height: 45px;
  width: 45px;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  flex-shrink: 0;
  align-self: end;
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

const HeaderOptionsContainer = styled.ul`
  flex-grow: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;

  li {
  }
`;

const SearchChatBtn = styled.button`
  height: 40px;
  width: 40px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #203047;
  border: none;
  color: #4e5d73;
  border-radius: 5px;

  &:hover {
    background-color: #bfdbfe;
    color: #326dec;
  }
`;

const ChatSearchContainer = styled.div`
  height: 50px;
  width: 100%;
  background-color: #132036;
  display: flex;
  align-items: center;
  padding: 5px 5px 5px 10px;

  button {
    height: 100%;
    min-width: 40px;
    max-width: 40px;
    flex-shrink: 0;
    font-size: 18px;
    border: none;
    background-color: transparent;
    color: #94a3b8;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    height: 100%;
    flex-grow: 1;
    background-color: transparent;
    outline: none;
    border: none;
    font-size: 15px;
    padding: 0px 10px 0px 5px;
    color: #94a3b8;
    &::placeholder {
      color: #94a3b8;
      font-weight: 400;
    }
  }

  .arrow-btn {
    all: unset;
    height: 100%;
    min-width: 40px;
    max-width: 40px;
    flex-shrink: 0;
    font-size: 18px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin: 0px 3px 0px 3px;
    background-color: transparent;
    color: #94a3b8;
    cursor: pointer;
    &:hover {
      background-color: #bfdbfe;
    }
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100%;
  border-radius: 5px;
  border: ${({ isChatSearchFocus }) =>
    isChatSearchFocus ? "none" : "1px solid #203047"};
  background-color: ${({ isChatSearchFocus }) =>
    isChatSearchFocus ? "#0f172a" : "transparent"};
  transition: border 0.2s ease-in-out 0s, background-color 0.2s ease-in-out 0.2s;
`;
