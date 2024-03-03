import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  padding: 10px;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: #132036;
  width: 100%;

  @media screen and (min-width: 576px) {
    width: 320px;
  }
  overflow-y: auto;
  padding: 0px 10px 10px 10px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;