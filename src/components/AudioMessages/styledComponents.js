import styled from "styled-components";
import { LuFileAudio } from "react-icons/lu";

export const MainContainer = styled.div`
  padding: 10px;
  color: #fff;
  width: 200px;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-left: ${(props) => {
    const { sentBy, profile } = props;
    return sentBy === profile.email ? "auto" : "";
  }};
  display: flex;
  flex-direction: row;
  /* border: 2px solid yellow; */

  p {
    align-self: flex-end;
    color: #94a3b8;
    font-size: 12px;
    margin-top: 5px;
  }
`;

export const SenderProfileContainer = styled.div`
  width: 40px;
  height: 40px;
  align-self: flex-end;
  flex-shrink: 0;
  margin-right: 10px;
  border-radius: 50%;
  overflow: hidden;
  /* border: 2px solid red; */
  background-image: ${(props) => {
    const { backgroundImage } = props;
    return `url(${backgroundImage})`;
  }};
  background-size: cover;
`;

export const AudioMessageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  button {
    background-color: #203047;
    border: none;
    border-radius: 10px;
    padding: 10px;
    color: #4e5d73;
    font-size: 30px;
    cursor: pointer;
    &:hover {
      background-color: #bfdbfe;
      color: #326dec;
    }
  }
`;

export const MusicFileIcon = styled(LuFileAudio)``;

export const AudioContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  audio{
    width:100%;
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
