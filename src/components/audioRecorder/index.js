import React, { useEffect, useRef, useState, useContext } from "react";
import { MdSend } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { ChatContext } from "../Context/ChatContext";
import {
  MainContainer,
  CloseButton,
  StatusContainer,
  ButtonContainer,
  SendButton,
  StartButton,
  RecordingIcon,
  AudioPlayerContainer,
} from "./styledComponents";

// Message type to identify the type of message being shared.
const messageTypeConstants = {
  text: "TEXT",
  image: "IMAGE",
  audio: "AUDIO",
};

const AudioRecorder = ({ onClose, setChatData, setMessageType }) => {
  // State variables to manage recording and audio playback
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const { profile, selectedChat, socket } = useContext(ChatContext);

  // Ref to interact with the <audio> element
  const audioRef = useRef();

  // useEffect to initialize MediaRecorder and access the user's microphone
  useEffect(() => {
    const initializeMediaRecorder = async () => {
      try {
        // Request access to the user's microphone
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        // Create a MediaRecorder instance with the microphone stream
        const recorder = new MediaRecorder(stream);

        // Event listener for the availability of recorded data
        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            // Add the recorded data chunk to the array
            setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
          }
        };

        // Event listener for when recording is stopped
        recorder.onstop = () => {
          // Update the recording state
          setIsRecording(false);
        };

        // Set the MediaRecorder instance in the state
        setMediaRecorder(recorder);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    // Initialize MediaRecorder when the component mounts
    initializeMediaRecorder();
  }, [recordedChunks]);

  // useEffect to start/stop MediaRecorder based on the recording state
  useEffect(() => {
    if (isRecording && mediaRecorder) {
      mediaRecorder.start();
    } else if (!isRecording && mediaRecorder) {
      mediaRecorder.stop();
    }
  }, [isRecording, mediaRecorder]);

  // useEffect to process recorded data after recording stops
  useEffect(() => {
    if (!isRecording && recordedChunks.length > 0) {
      // Create a Blob from the recorded chunks
      const blob = new Blob(recordedChunks, { type: "audio/wav" });
      // Create a URL for the Blob and set it as the audio URL
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
    }
  }, [isRecording, recordedChunks]);

  // Function to start recording
  const startRecording = () => {
    // Clear the recorded chunks array
    setRecordedChunks([]);
    // Update the recording state
    setIsRecording(true);
  };

  // Function to stop recording
  const stopRecording = () => {
    // Update the recording state
    setIsRecording(false);
  };

  // Helper function to convert Blob to base64
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleAudioSent = async () => {
    try {
      if (recordedChunks.length === 0) {
        console.error("No recorded data available");
        return;
      }

      // Create a Blob from the recorded chunks
      const blob = new Blob(recordedChunks, { type: "audio/wav" });

      // Convert the Blob to base64
      const base64Audio = await blobToBase64(blob);

      const formData = {
        uploaded_audio: base64Audio,
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

      // Reset the audio recording state
      setRecordedChunks([]);
      setAudioURL("");
      onClose();
      setMessageType(messageTypeConstants.text);
    } catch (error) {
      console.error("Error sending audio:", error);
    }
  };

  return (
    <MainContainer>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      {/* Display recording status */}
      <StatusContainer style={{ fontSize: "2rem" }}>
        {isRecording ? (
          <p>
            <RecordingIcon />
            Recording . . .
          </p>
        ) : (
          <p>Ready to record</p>
        )}
      </StatusContainer>

      {/* Button to start/stop recording */}
      <ButtonContainer>
        <StartButton
          title="Start Recording"
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? "Stop" : "Start"}
        </StartButton>
        {recordedChunks.length > 0 && (
          <SendButton onClick={handleAudioSent}>
            <MdSend />
          </SendButton>
        )}
      </ButtonContainer>

      {/* Display audio player if there is an audio URL */}
      <AudioPlayerContainer>
        {audioURL && <audio ref={audioRef} src={audioURL} controls />}
      </AudioPlayerContainer>
    </MainContainer>
  );
};

export default AudioRecorder;
