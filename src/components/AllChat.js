import { useContext } from "react";
import styled from "styled-components";
import { ChatContext } from "./ChatContext";

const chatList = [
  {
    id: 1,
    name: "Jasmine Thompson",
    imageUrl: "https://connectme-html.themeyn.com/images/avatar/1.jpg",
    email: "jasmineThompson@gmail.com",
  },
  {
    id: 2,
    name: "Konstantin Frank",
    imageUrl: "https://connectme-html.themeyn.com/images/avatar/2.jpg",
    email: "konstantinfrank@gmail.com",
  },
  {
    id: 4,
    name: "Marie George",
    imageUrl: "https://connectme-html.themeyn.com/images/avatar/4.jpg",
    email: "mariegeorge@gmail.com",
  },
  {
    id: 5,
    name: "Phillip Burke",
    imageUrl: "https://connectme-html.themeyn.com/images/avatar/5.jpg",
    email: "phillipburke@gmail.com",
  },
  {
    id: 6,
    name: "Romy Schulte",
    imageUrl: "https://connectme-html.themeyn.com/images/avatar/6.jpg",
    email: "romyschulte@gmail.com",
  },
  {
    id: 7,
    name: "Frances Arnold",
    imageUrl: "https://connectme-html.themeyn.com/images/avatar/7.jpg",
    email: "francesarnold@gmail.com",
  },
  {
    id: 8,
    name: "Nina Dubois",
    imageUrl: "https://connectme-html.themeyn.com/images/avatar/8.jpg",
    email: "ninadubois@gmail.com",
  },
  {
    id: 9,
    name: "Albert Henderson",
    imageUrl: "https://connectme-html.themeyn.com/images/avatar/9.jpg",
    email: "alberthenderson@gmail.com",
  },
  {
    id: 10,
    name: "Maxim Werner",
    imageUrl: "https://connectme-html.themeyn.com/images/avatar/10.jpg",
    email: "maximwerner@gmail.com",
  },
  {
    id: 11,
    name: "Nolan Etienne",
    imageUrl: "https://connectme-html.themeyn.com/images/avatar/11.jpg",
    email: "nolanetienne@gmail.com",
  },
];

export default function AllChat() {
  const { setSelectedChat, profile } = useContext(ChatContext);

  return (
    <MainContainer>
      <div className="top-container">
        <p className="chats-para">Chats</p>
        <h1>{profile.name}</h1>
      </div>
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
