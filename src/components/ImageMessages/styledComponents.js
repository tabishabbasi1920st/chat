import styled from "styled-components";

export const MainContainer = styled.div`
  padding: 10px;
  color: #fff;
  max-width: 40%;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-left: ${(props) => {
    const { sentBy, profile } = props;
    return sentBy === profile.email ? "auto" : "";
  }};
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .message-content {
    min-width: 100%;
    max-height: 90%;
    display: flex;
    flex-direction: column;
  }

  .message-content p {
    align-self: flex-end;
    color: #94a3b8;
    font-size: 12px;
    margin-top: 5px;
  }

  img {
    height: 100%;
    width: 100%;
    border-radius: 10px;
    cursor: pointer;
  }

  .sender-profile-container {
    max-height: 40px;
    max-width: 40px;
    align-self: flex-end;
    flex-shrink: 0;
    margin-right: 10px;
    border-radius: 50%;
    overflow: hidden;
  }
`;

export const FullImageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  border: 2px solid red;
`;
