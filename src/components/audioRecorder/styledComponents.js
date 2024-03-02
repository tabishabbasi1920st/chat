import styled, { keyframes } from "styled-components";
import { MdFiberManualRecord, MdSend } from "react-icons/md";

export const MainContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
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
`;

export const StatusContainer = styled.div`
  flex-grow: 1;
  display: flex;
  padding: 0px 0px 0px 10px;
  align-items: center;
  justify-content: center;

  p {
    font-size: 20px;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

export const ButtonContainer = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-around;
`;

export const SendButton = styled.button`
  border: none;
  height: 100%;
  width: 80px;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 5px;
  background-color: #e11d48;
  cursor: pointer;
`;

export const StartButton = styled.button`
  border: none;
  height: 100%;
  width: 80px;
  font-size: 16px;
  color: #fff;
  background-color: ${({ isRecording }) =>
    isRecording ? "transparent" : "#203047"};
  border-radius: 5px;
  cursor: pointer;
`;

export const blinkAnimation = keyframes`
  0%, 50%, 100%{
    opacity:1;
  }
  25%, 75%{
    opacity: 0;
  }
`;

export const RecordingIcon = styled(MdFiberManualRecord)`
  font-size: 24px;
  color: #ff0000;
  animation: ${blinkAnimation} 3s infinite;
`;

export const AudioPlayerContainer = styled.div`
  /* border: 2px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;

  audio {
    width: 100%;
    max-width: 300px; /* Set a maximum width for better responsiveness */
  }
`;
