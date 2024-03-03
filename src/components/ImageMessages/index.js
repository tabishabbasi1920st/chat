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

  console.log(">>>>>>", newMessage);

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

  const selectedChatImageUrl = `http://localhost:${process.env.REACT_APP_PORT}/${selectedChat.imageUrl}`;
  const newMessageImageUrl = `http://localhost:${process.env.REACT_APP_PORT}/${newMessage}`;

  const renderSenderUserDp = () => {
    return (
      <div className="sender-profile-container">
        <img src={selectedChatImageUrl} alt="Profile Picture" />
      </div>
    );
  };

  console.log(fullImageModal);

  return (
    <MainContainer sentBy={sentBy} profile={profile}>
      {sentBy === selectedChat.email && renderSenderUserDp()}
      <div className="message-content" sentBy={sentBy} profile={profile}>
        <img
          src={newMessageImageUrl}
          onClick={() => {
            setFullImageModal(true);
            setFullImageUrl(newMessageImageUrl);
          }}
          title="click to see on full page"
        />
        <p>{`${formattedHours}:${formattedMinutes} ${amOrPm}`}</p>
      </div>
    </MainContainer>
  );
}
