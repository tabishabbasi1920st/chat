import {
  MainContainer,
  UserHeaderContainer,
  BackButton,
  InformationContainer,
  Username,
  Status,
  MainChatContainer,
  UserFooterContainer,
  SendButton,
  MessageInput,
  DpContainer,
  SentMessage,
  ReceivedMessage,
  SenderDp,
  LoaderContainer,
  HeaderOptionsContainer,
  SearchChatBtn,
  ChatSearchContainer,
  InnerContainer,
  ImageInputButton,
  MicButton,
} from "./styledComponents";

import { IoArrowBackSharp } from "react-icons/io5";
import { MdSend } from "react-icons/md";
import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../Context/ChatContext";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import { Oval } from "react-loader-spinner";
import { FaSearch, FaMicrophone } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import AudioRecorder from "../AudioRecorder";
import Modal from "../Modal";

// API constants to track the status of the API.
const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

// Message type to identify the type of message being shared.
const messageTypeConstants = {
  text: "TEXT",
  image: "IMAGE",
  audio: "AUDIO",
};

export default function ChatContainer() {
  // Consuming Context Values here.
  const { selectedChat, setSelectedChat, socket, profile } =
    useContext(ChatContext);

  // Maintaining all references.
  const chatContainerRef = useRef();
  const imageInputRef = useRef();

  // Using hooks for state management.
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);
  const [chatData, setChatData] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [isChatSearchFocus, setIsChatSearchFocus] = useState(false);
  const [chatSearchInput, setChatSearchInput] = useState("");
  const [showHideChatSearch, setShowHideChatSearch] = useState(false);
  const [messageType, setMessageType] = useState(messageTypeConstants.text);
  const [image, setImage] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Scroll to the bottom of the chat when new messages are received.
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chatData]);

  useEffect(() => {
    // API to get chats of profile and selectedChat user.
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

      try {
        const response = await fetch(apiUrl, options);
        if (response.ok) {
          const chatData = await response.json();
          setChatData(chatData);
          setApiStatus(apiConstants.success);
        } else {
          setApiStatus(apiConstants.failure);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
        setApiStatus(apiConstants.failure);
      }
    };

    // API to check whether selectedChat user is online or offline.
    const getOnlineStatus = async () => {
      const apiUrl = `http://localhost:5000/user-status?user=${selectedChat.email}`;
      try {
        const response = await fetch(apiUrl);
        const fetchedData = await response.json();
        const onlineStatus = fetchedData.isOnline;
        setIsOnline(onlineStatus);
      } catch (error) {
        console.error("Error fetching online status:", error);
      }
    };

    // Fetch chats and online status only if profile and selectedChat are not null.
    if (profile !== null && selectedChat !== null) {
      gettingChats();
      getOnlineStatus();
    }

    // Listen to events to get messages sent by the selectedChat user.
    socket.on("privateMessage", (newMessage) => {
      setChatData((prevData) => [...prevData, newMessage]);
    });

    socket.on("privateImage", (newImgMsg) => {
      setChatData((prevList) => [...prevList, newImgMsg]);
    });

    socket.on("privateAudio", (message) => {
      console.log("..............event in frontend chatcontainer");
      setChatData((prevData) => [...prevData, message]);
    });

    // Cleanup socket event listeners and reset message input when component unmounts.
    return () => {
      socket.off("privateMessage");
      socket.off("privateAudio");
      socket.off("privateImage");
      setMessageInput("");
    };
  }, [selectedChat]);

  const handleImageInput = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);

      setMessageInput(file.name);
      setMessageType(messageTypeConstants.image);
    } else {
      setImage(null);
      setMessageInput("");
      setMessageType(messageTypeConstants.image);
    }
  };

  // Handle sending the selected image to the server.
  const handleImageSent = () => {
    if (!image) {
      console.error("No image selected");
      return;
    }

    const formData = {
      uploaded_image: image.split(",")[1],
    };

    const dateAndTime = new Date();

    const message = {
      id: uuidv4(),
      newMessage: formData,
      dateTime: dateAndTime,
      sentBy: profile.email,
      sentTo: selectedChat.email,
      type: "IMAGE",
    };

    // Emit the privateImage event to the server.
    socket.emit("privateImage", message, (ack) => {
      const { success, message } = ack;
      if (success) {
        // Update the chatData with the sent image message.
        setChatData((prevList) => [...prevList, message]);
      } else {
        console.error(
          "Error while getting image acknowledgment",
          success,
          message
        );
      }
    });

    setMessageInput("");
    setMessageType(messageTypeConstants.text);
  };

  // Handle sending the appropriate message (text or image) to the server.
  const sendAppropriateMsgHandler = () => {
    if (messageType === messageTypeConstants.text) {
      handleMessageSent();
    } else if (messageType === messageTypeConstants.image) {
      handleImageSent();
    }
  };

  // Render a loader component

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

  // Handle sending a text message.
  const handleMessageSent = () => {
    const dateAndTime = new Date();
    const message = {
      id: uuidv4(),
      newMessage: messageInput,
      dateTime: dateAndTime,
      sentBy: profile.email,
      sentTo: selectedChat.email,
      type: messageTypeConstants.text,
    };

    // Emit the privateMessage event to the server.
    socket.emit("privateMessage", message, (ack) => {
      if (ack.success) {
        console.log(ack.message, ack.success);
      } else {
        console.error(ack.message, ack.success);
      }
    });

    // Update the chatData with the sent text message.
    setChatData((prevList) => [...prevList, message]);
    setMessageInput("");
  };

  // Render a failure view.
  const renderFailureView = () => {
    return (
      <LoaderContainer>
        <p>Something went wrong</p>
      </LoaderContainer>
    );
  };

  // Build the UI for each message in the chat.
  const buildMessagesUi = (eachConversation, index) => {
    const { id, newMessage, dateTime, sentBy, sentTo, type } = eachConversation;
    const isContain = newMessage.toLowerCase().includes(chatSearchInput);

    console.log(type);

    const dt = new Date(dateTime);
    const hour = dt.getHours();
    const formattedHours = hour % 12 || 12; // convert to 12-hour format.
    const amOrPm = hour < 12 ? "AM" : "PM";
    const minutes = dt.getMinutes().toLocaleString();

    const backendPort = 5000;
    const imageSource = `http://localhost:${backendPort}/${newMessage}`;

    if (sentBy === profile.email) {
      return (
        <SentMessage key={index}>
          {type === messageTypeConstants.text && (
            <p
              className="text-message"
              style={{
                backgroundColor: `${
                  isContain && showHideChatSearch ? "green" : ""
                }`,
              }}
            >
              {newMessage}
            </p>
          )}{" "}
          {type === messageTypeConstants.image && (
            <img src={imageSource} alt="img" />
          )}
          {type === messageTypeConstants.audio && (
            <audio controls src={`http://localhost:5000/${newMessage}`} />
          )}
          <p className="text-message-time">{`${formattedHours}:${minutes}${amOrPm}`}</p>
        </SentMessage>
      );
    }
    if (sentBy === selectedChat.email) {
      return (
        <ReceivedMessage key={index}>
          <SenderDp backgroundImage={selectedChat.imageUrl}></SenderDp>
          <div className="sender-msg-container">
            {type === messageTypeConstants.text && (
              <p
                className="text-message"
                style={{
                  backgroundColor: `${
                    isContain && showHideChatSearch ? "green" : ""
                  }`,
                }}
              >
                {newMessage}
              </p>
            )}{" "}
            {type === messageTypeConstants.image && (
              <img src={imageSource} alt="img" />
            )}
            {type === messageTypeConstants.audio && (
              <audio controls src={`http://localhost:5000/${newMessage}`} />
            )}
            <p className="text-message-time">{`${formattedHours}:${minutes}${amOrPm}`}</p>
          </div>
        </ReceivedMessage>
      );
    }
  };

  // Render the success view with the chat messages.
  const renderSuccessView = () => {
    return (
      <>
        {chatData.map((eachConversation, index) =>
          buildMessagesUi(eachConversation, index)
        )}
      </>
    );
  };

  // Render the appropriate view based on the API status.
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

  // Render the chat search input component.
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
            onChange={(e) => {
              setChatSearchInput(e.target.value.toLowerCase());
            }}
          />
        </InnerContainer>

        <button
          onClick={() => {
            setShowHideChatSearch(false);
            setChatSearchInput("");
          }}
          className="arrow-btn"
          style={{ backgroundColor: "#203047" }}
        >
          <IoMdClose />
        </button>
      </ChatSearchContainer>
    );
  };

  const openModel = () => {
    setModalOpen(true);
  };

  const closeModel = () => {
    setModalOpen(false);
  };

  return (
    <MainContainer>
      <Modal isOpen={isModalOpen}>
        <AudioRecorder
          onClose={closeModel}
          setChatData={setChatData}
          setMessageType={setMessageType}
        />
      </Modal>
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
        <ImageInputButton
          onClick={() => document.getElementById("imageInput").click()}
        >
          <FaImage />
        </ImageInputButton>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageInput}
          ref={imageInputRef}
          id="imageInput"
          enctype="multipart/form-data"
        />

        <MicButton
          onClick={() => {
            setMessageType(messageTypeConstants.audio);
            openModel();
          }}
        >
          <FaMicrophone />
        </MicButton>

        <MessageInput
          placeholder="Type a message..."
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && messageInput !== "") {
              sendAppropriateMsgHandler();
            }
          }}
        />
        <SendButton
          disabled={messageInput === ""}
          type="button"
          onClick={sendAppropriateMsgHandler}
        >
          <MdSend />
        </SendButton>
      </UserFooterContainer>
    </MainContainer>
  );
}
