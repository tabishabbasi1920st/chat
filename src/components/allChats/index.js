import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/ChatContext";
import { Oval } from "react-loader-spinner";
import { FaSearch } from "react-icons/fa";
import {
  LoaderContainer,
  SearchContainer,
  SearchLensBtn,
  BackgroundImageContainer,
  DescriptionContainer,
  MainContainer,
  TopContainer,
} from "./styledComponents";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

export default function AllChat() {
  const { setSelectedChat } = useContext(ChatContext);
  const [chatList, setChatList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);
  const [isSearchFocus, setIsSearchFocus] = useState(false);
  const [searchInput, setSearchInput] = useState("");

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

  const getFilteredListBySearch = () => {
    const filteredList = chatList.filter((eachChat) => {
      return eachChat.name.toLowerCase().includes(searchInput.toLowerCase());
    });

    return filteredList;
  };

  const renderSearch = () => {
    return (
      <SearchContainer isSearchFocus={isSearchFocus}>
        <SearchLensBtn>
          <FaSearch />
        </SearchLensBtn>
        <input
          type="search"
          value={searchInput}
          placeholder="Search contact / chat"
          onFocus={() => setIsSearchFocus(true)}
          onBlur={() => setIsSearchFocus(false)}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </SearchContainer>
    );
  };

  const renderSuccessView = () => {
    return (
      <ul>
        {getFilteredListBySearch().map((eachChat) => {
          const { id, name, imageUrl, email } = eachChat;
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
      <TopContainer>
        <p>Chats</p>
        {renderSearch()}
      </TopContainer>
      {renderAppropriateView()}
    </MainContainer>
  );
}
