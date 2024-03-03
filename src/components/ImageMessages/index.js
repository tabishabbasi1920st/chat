import { ChatContext } from "../Context/ChatContext";
import { useContext } from "react";
import {
  MainContainer,
  CloseButton,
  FullImageContainer,
} from "./styledComponents";
import Modal from "../Modal";

export default function TextMessages(props) {
  const { eachImageMessage } = props;
  const { dateTime, newMessage, sentBy, name } = eachImageMessage;

  const BACKEND_PORT = 5000;
  const imageUrl = `http://localhost:${BACKEND_PORT}/${newMessage}`;

  const dt = new Date(dateTime);
  const hour = dt.getHours();
  const formattedHours = hour % 12 || 12; // convert to 12-hour format.
  const amOrPm = hour < 12 ? "AM" : "PM";
  const minutes = dt.getMinutes().toLocaleString();
  const formattedMinutes = minutes.length < 2 ? `0${minutes}` : minutes;

  const {
    profile,
    selectedChat,
    setFullImageModal,
    fullImageModal,
    setFullImageUrl,
  } = useContext(ChatContext);

  const renderSenderUserDp = () => {
    const { imageUrl } = selectedChat;
    return (
      <div className="sender-profile-container">
        <img src={imageUrl} alt="Profile Picture" />
      </div>
    );
  };

  console.log(fullImageModal);

  return (
    <MainContainer sentBy={sentBy} profile={profile}>
      {sentBy === selectedChat.email && renderSenderUserDp()}
      <div className="message-content" sentBy={sentBy} profile={profile}>
        <img
          src={imageUrl}
          onClick={() => {
            setFullImageModal(true);
            setFullImageUrl(imageUrl);
          }}
          title="click to see on full page"
        />
        <p>{`${formattedHours}:${formattedMinutes} ${amOrPm}`}</p>
      </div>
    </MainContainer>
  );
}
