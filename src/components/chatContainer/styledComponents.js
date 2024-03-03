import styled from "styled-components";

export const MainContainer = styled.div`
  height: 100vh;
  width: 100%;
`;

export const UserHeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #132036;
  border-bottom: 1px solid #334155;
  @media screen and (min-width: 768px) {
    padding-left: 10px;
  }
`;

export const BackButton = styled.button`
  height: 100%;
  width: 40px;
  margin-right: 5px;
  font-size: 20px;
  background-color: transparent;
  border: none;
  color: #475569;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 768px) {
    display: none;
  }
  &:hover {
    background-color: white;
  }
`;

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
  justify-content: space-between;
`;

export const Username = styled.p`
  font-weight: 500;
  color: #cbd5e1;
  font-size: 14px;
`;

export const Status = styled.p`
  font-size: 12px;
  color: #94a3b8;
`;

export const MainChatContainer = styled.div`
  min-width: 100%;
  max-width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #0f172a;
  padding: 0px 10px 0px 10px;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #070b15;
  }
`;

export const UserFooterContainer = styled.div`
  height: 70px;
  width: 100%;
  background-color: #132036;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;

  border-top: 1px solid #334155;
  @media screen and (min-width: 768px) {
    padding-right: 10px;
  }
`;

export const SendButton = styled.button`
  height: 40px;
  width: 60px;
  font-size: 30px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  color: #94a3b8;
  cursor: pointer;
  &:disabled {
    opacity: 0.2;
  }
  &:enabled:hover {
    background-color: white;
    border-radius: 5px;
    margin: 5px;
    height: 70%;
  }
  &:disabled:hover {
    cursor: not-allowed;
  }
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const MessageInput = styled.input`
  height: 50px;
  background-color: #0f172a;
  border: none;
  border-radius: 5px;
  outline: none;
  flex-grow: 1;
  color: #94a3b8;
  font-size: 16px;
  padding: 5px 10px;
  min-width: 50px;

  &::placeholder {
    color: #94a3b8;
  }
`;

export const DpContainer = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 5px;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
`;

export const SenderDp = styled.div`
  height: 45px;
  width: 45px;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  flex-shrink: 0;
  align-self: end;
`;

export const LoaderContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  p {
    color: #fff;
    margin-left: 5px;
  }
`;

export const HeaderOptionsContainer = styled.ul`
  flex-grow: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;

  li {
  }
`;

export const SearchChatBtn = styled.button`
  height: 40px;
  width: 40px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #203047;
  border: none;
  color: #4e5d73;
  border-radius: 5px;

  &:hover {
    background-color: #bfdbfe;
    color: #326dec;
  }
`;

export const ChatSearchContainer = styled.div`
  height: 50px;
  width: 100%;
  background-color: #132036;
  display: flex;
  align-items: center;
  padding: 5px 5px 5px 10px;

  button {
    height: 100%;
    min-width: 40px;
    max-width: 40px;
    flex-shrink: 0;
    font-size: 18px;
    border: none;
    background-color: transparent;
    color: #94a3b8;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    height: 100%;
    flex-grow: 1;
    background-color: transparent;
    outline: none;
    border: none;
    font-size: 15px;
    padding: 0px 10px 0px 5px;
    color: #94a3b8;
    &::placeholder {
      color: #94a3b8;
      font-weight: 400;
    }
  }

  .arrow-btn {
    all: unset;
    height: 100%;
    min-width: 40px;
    max-width: 40px;
    flex-shrink: 0;
    font-size: 18px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin: 0px 3px 0px 3px;
    background-color: transparent;
    color: #94a3b8;
    cursor: pointer;
    &:hover {
      background-color: #bfdbfe;
    }
  }
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100%;
  border-radius: 5px;
  border: ${({ isChatSearchFocus }) =>
    isChatSearchFocus ? "none" : "1px solid #203047"};
  background-color: ${({ isChatSearchFocus }) =>
    isChatSearchFocus ? "#0f172a" : "transparent"};
  transition: border 0.2s ease-in-out 0s, background-color 0.2s ease-in-out 0.2s;
`;

export const MediaButtons = styled.button`
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
