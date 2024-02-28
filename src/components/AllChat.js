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
  const { setSelectedChat, onlineUsersList } = useContext(ChatContext);
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
      <LoaderContainer>
        <Oval
          visible={true}
          height="100%"
          width="50"
          color="#fff"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </LoaderContainer>
    );
  };

  const renderSuccessView = () => {
    return (
      <ul>
        {chatList.map((eachChat) => {
          const { id, name, imageUrl, email } = eachChat;
          return (
            <li key={id} onClick={() => setSelectedChat(eachChat)}>
              <BackgroundImageContainer
                style={{ backgroundImage: `url(${imageUrl})` }}
              >
                {onlineUsersList.includes(email) && <h1>.</h1>}
              </BackgroundImageContainer>

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

  return <MainContainer>{renderAppropriateView()}</MainContainer>;
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

  .chats-para {
    color: #fff;
    font-size: 22px;
    font-weight: 600;
    padding-left: 10px;
  }

  ul {
    height: calc(100vh - 50px);
    overflow: auto;
    padding-bottom: 10px;
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
  /* border: 1px solid red; */
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  h1 {
    margin: 0px;
    padding: 0px;
    line-height: 0.6;
    color: green;
    font-weight: bold;
    font-size: 50px;
  }
`;

const DescriptionContainer = styled.div`
  flex-grow: 1;
  height: 100%;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LoaderContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
