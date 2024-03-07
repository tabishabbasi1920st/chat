import { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import { MdAudiotrack } from "react-icons/md";
import Modal from "../Modal";
import { ChatContext } from "../Context/ChatContext";
import { v4 as uuidv4 } from "uuid";

export default function Mp3Messages() {
  const [audioBase64, setAudioBase64] = useState(null);
  const { profile, selectedChat, socket, setChatData } =
    useContext(ChatContext);

  useEffect(() => {
    return () => {
      console.log("unmounted");
      setAudioBase64(null);
    };
  }, []);

  const audioFile = useRef();

  const handleAudioChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(",")[1];
        setAudioBase64(base64);
      };

      reader.readAsDataURL(file);
    }
  };

  const uploadAudio = async () => {
    const formData = {
      uploaded_audio: audioBase64,
    };

    const dateAndTime = new Date();

    const message = {
      id: uuidv4(),
      newMessage: formData,
      dateTime: dateAndTime,
      sentBy: profile.email,
      sentTo: selectedChat.email,
      type: "AUDIO",
    };

    // Emit the privateAudio event to the server.
    socket.emit("privateAudio", message, (ack) => {
      const { success, message } = ack;
      if (success) {
        // Update the chatData with the sent audio message.
        setChatData((prevList) => [...prevList, message]);
      } else {
        console.error(
          "Error while getting audio acknowledgment",
          success,
          message
        );
      }
    });

    // const apiUrl = `http://localhost:${process.env.REACT_APP_PORT}/mp3file-upload`;
    // const options = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ message: message }),
    // };

    // const response = await fetch(apiUrl, options);
    // console.log(response);
  };

  const handleSendBtn = () => {
    uploadAudio();
    setAudioBase64(null);
  };

  return (
    <>
      <MediaButtons onClick={() => audioFile.current.click()}>
        <MdAudiotrack />
      </MediaButtons>
      <Modal isOpen={audioBase64 !== null}>
        <Container>
          <CloseButton onClick={() => setAudioBase64(null)}>
            &times;
          </CloseButton>
          <audio src={`data:audio/wav;base64,${audioBase64}`} controls />
          <SendButton onClick={handleSendBtn}>Send</SendButton>
        </Container>
      </Modal>
      <input
        type="file"
        accept="audio/*"
        ref={audioFile}
        onChange={handleAudioChange}
        style={{ display: "none" }}
      />
    </>
  );
}

const MediaButtons = styled.button`
  height: 70%;
  min-width: 45px;
  max-width: 45px;
  flex-shrink: 0;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  background-color: #203047;
  color: #4e5d73;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    color: #326dec;
    background-color: #bfdbfe;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  audio {
    width: 100%;
  }
`;

export const CloseButton = styled.button`
  border: none;
  background: none;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  position: relative;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
  align-self: flex-end;
`;

export const SendButton = styled.button`
  height: 70%;
  padding: 10px;
  width: 100%;
  flex-shrink: 0;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  background-color: #e11d48;
  color: #fff;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    color: #326dec;
    background-color: #bfdbfe;
  }
`;
