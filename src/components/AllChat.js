import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ChatContext } from "./ChatContext";
import { Oval } from "react-loader-spinner";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

export default function AllChat() {
  const { setSelectedChat, profile } = useContext(ChatContext);
  const [chatList, setChatList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);

  useEffect(() => {
    const getAllChats = async () => {
      try {
        setApiStatus(apiConstants.inProgress);
        const apiUrl = "http://localhost:5000/all-chats";
        const response = await fetch(apiUrl);
        const fetchedData = await response.json();
        if (response.ok) {
          const chatList = fetchedData.allChats;
          setChatList(chatList);
          setApiStatus(apiConstants.success);
        } else {
          setApiStatus(apiConstants.failure);
        }
      } catch (err) {
        console.log("Error while fetching chatlist:", err);
        setApiStatus(apiConstants.failure);
      }
    };

    getAllChats();
  }, []);

  const renderLoader = () => {
    return (
      <Oval
        visible={true}
        height="100%"
        width="25"
        color="#fff"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    );
  };

  const renderSuccessView = () => {
    return (
      <ul>
        {chatList.map((eachChat) => {
          const { id, name, imageUrl } = eachChat;
          return (
            <li key={id} onClick={() => setSelectedChat(eachChat)}>
              <BackgroundImageContainer
                style={{ backgroundImage: `url(${imageUrl})` }}
              />
              <DescriptionContainer>
                <p>{name}</p>
              </DescriptionContainer>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderFailureView = () => {
    return <div>Failure view</div>;
  };

  const renderAppropriateView = () => {
    switch (apiStatus) {
      case apiConstants.success:
        return renderSuccessView();
      case apiConstants.inProgress:
        return renderLoader();
      default:
        return renderFailureView();
    }
  };

  return (
    <MainContainer>
      <div className="top-container">
        <p className="chats-para">Chats</p>
      </div>
      {renderAppropriateView()}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  width: 100%;
  background-color: #132036;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  @media screen and (min-width: 768px) {
    border-right: 1px solid #334155;
  }

  .top-container {
    height: 70px;
    border-bottom: 1px solid #334155;
    display: flex;
    align-items: center;
  }

  .chats-para {
    color: #fff;
    font-size: 22px;
    font-weight: 600;
    padding-left: 10px;
  }

  ul {
    height: calc(100vh - 70px);
    overflow: auto;
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #070b15;
    }
  }

  li {
    padding: 10px 10px;
    width: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  li:hover {
    background-color: #0f172a;
  }

  li p {
    color: #cbd5e1;
  }
`;

const BackgroundImageContainer = styled.div`
  height: 55px;
  width: 55px;
  background-size: cover;
  background-position: center;
  border-radius: 5px;
`;

const DescriptionContainer = styled.div`
  flex-grow: 1;
  height: 100%;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
