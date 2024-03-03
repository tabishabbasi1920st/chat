import styled from "styled-components";
import { ChatContext } from "../Context/ChatContext";
import { useContext } from "react";

export default function FullImageModal() {
  const { setFullImageModal, fullImageUrl } = useContext(ChatContext);

  return (
    <MainContainer>
      <CloseButton onClick={() => setFullImageModal(false)}>
        &times;
      </CloseButton>
      <ContainerHolder>
        <ImageContainer>
          <img src={fullImageUrl} alt="full image" />
        </ImageContainer>
      </ContainerHolder>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const CloseButton = styled.button`
  border: none;
  background: none;
  font-size: 30px;
  color: #fff;
  cursor: pointer;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
`;

export const ContainerHolder = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    padding: 10px;
    background-color: #ffffff;
  }
`;

export const ImageContainer = styled.div`
  max-height: 98%;
  margin: 10px;
  img {
    height: 100%;
    width: 100%;
    border-radius: 10px;
  }
`;
