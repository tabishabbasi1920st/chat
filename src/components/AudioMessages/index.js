import { ChatContext } from "../Context/ChatContext";
import { useContext, useState } from "react";
import Modal from "../Modal";
import {
  MainContainer,
  AudioMessageContainer,
  SenderProfileContainer,
  MusicFileIcon,
  AudioContainer,
  CloseButton,
} from "./styledComponents";

export default function TextMessages(props) {
  const { eachAudioMessage } = props;
  const { dateTime, newMessage, sentBy, name } = eachAudioMessage;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const BACKEND_PORT = 5000;
  const audioUrl = `http://localhost:${BACKEND_PORT}/${newMessage}`;

  const dt = new Date(dateTime);
  const hour = dt.getHours();
  const formattedHours = hour % 12 || 12; // convert to 12-hour format.
  const amOrPm = hour < 12 ? "AM" : "PM";
  const minutes = dt.getMinutes().toLocaleString();
  const formattedMinutes = minutes.length < 2 ? `0${minutes}` : minutes;

  const { profile, selectedChat } = useContext(ChatContext);

  const handleAudioButtonClick = () => {
    setIsModalOpen(true);
  };

  const onModalclose = () => {
    setIsModalOpen(false);
  };

  const renderSenderUserDp = () => {
    const imageUrl = `http://localhost:${process.env.REACT_APP_PORT}/${selectedChat.imageUrl}`;
    return (
      <SenderProfileContainer
        backgroundImage={imageUrl}
      ></SenderProfileContainer>
    );
  };

  return (
    <MainContainer sentBy={sentBy} profile={profile}>
      <Modal isOpen={isModalOpen}>
        <AudioContainer>
          <CloseButton onClick={onModalclose}>&times;</CloseButton>
          <audio controls src={audioUrl} />
        </AudioContainer>
      </Modal>
      {sentBy === selectedChat.email && renderSenderUserDp()}
      <AudioMessageContainer sentBy={sentBy} profile={profile}>
        <button onClick={handleAudioButtonClick}>
          <MusicFileIcon />
        </button>
        <p>{`${formattedHours}:${formattedMinutes} ${amOrPm}`}</p>
      </AudioMessageContainer>
    </MainContainer>
  );
}
