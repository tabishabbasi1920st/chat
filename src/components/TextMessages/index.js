import styled from "styled-components";
import { ChatContext } from "../Context/ChatContext";
import { useContext } from "react";
import { MainContainer } from "./styledComponents";

export default function TextMessages(props) {
  const { eachTextMessage } = props;
  const { dateTime, newMessage, sentBy, delieveryStatus } = eachTextMessage;

  console.log(delieveryStatus);

  const dt = new Date(dateTime);
  const hour = dt.getHours();
  const formattedHours = hour % 12 || 12; // convert to 12-hour format.
  const amOrPm = hour < 12 ? "AM" : "PM";
  const minutes = dt.getMinutes().toLocaleString();
  const formattedMinutes = minutes.length < 2 ? `0${minutes}` : minutes;

  const { profile, selectedChat } = useContext(ChatContext);

  const renderSenderUserDp = () => {
    const imageUrl = `http://localhost:${process.env.REACT_APP_PORT}/${selectedChat.imageUrl}`;
    return (
      <div className="sender-profile-container">
        <img src={imageUrl} alt="Profile Picture" />
      </div>
    );
  };

  return (
    <MainContainer sentBy={sentBy} profile={profile}>
      {/* rendering user dp with its message */}
      {sentBy === selectedChat.email && renderSenderUserDp()}
      <div className="msg-container">
        <p className="msg">{newMessage}</p>
        <p className="msg-time">{`${formattedHours}:${formattedMinutes} ${amOrPm} `}</p>
        {sentBy === profile.email && <p>{delieveryStatus}</p>}
      </div>
    </MainContainer>
  );
}
