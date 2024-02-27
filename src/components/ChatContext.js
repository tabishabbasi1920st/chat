import React, { createContext, useState } from "react";

export const ChatContext = React.createContext();

const ChatContextProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    id: 3,
    name: "Mathias Devos",
    imageUrl: "https://connectme-html.themeyn.com/images/avatar/3.jpg",
    email: "mathiasdevos@gmail.com",
  });

  const [selectedChat, setSelectedChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const [conversationList, setConversationList] = useState([
    {
      dateTime: "2024-02-26T17:21:16.491Z",
      id: "67ecbfbd-0513-486f-bf73-98ef9f606662",
      newMessage: "hi",
      sentBy: "mathiasdevos@gmail.com",
      sentTo: "konstantinfrank@gmail.com",
    },
    {
      datetime: "2024-02-26T17:21:25.726Z",
      id: "4c35918c-317a-470e-879b-e629cf72ff3f",
      newMessage: "hello",
      sentBy: "konstantinfrank@gmail.com",
      sentTo: "mathiasdevos@gmail.com",
    },
    {
      datetime: "2024-02-26T17:21:33.075Z",
      id: "481a101e-0acf-4bdd-8ff1-e8c15c3e7fd4",
      newMessage: "kahan tu",
      sentBy: "konstantinfrank@gmail.com",
      sentTo: "mathiasdevos@gmail.com",
    },
    {
      dateTime: "2024-02-26T17:21:29.043Z",
      id: "ea254928-8039-4bec-b934-0a6b0e21045e",
      newMessage: "haan",
      sentBy: "mathiasdevos@gmail.com",
      sentTo: "konstantinfrank@gmail.com",
    },
    {
      dateTime: "2024-02-26T17:21:29.043Z",
      id: "ea254928-8039-4bec-b934-0a6b0e21045f",
      newMessage: "haan g",
      sentBy: "mathiasdevos@gmail.com",
      sentTo: "ponstantinfrank@gmail.com",
    },
  ]);

  const getChats = (profileEmail, selectedChatEmail) => {
    const filteredList = conversationList.filter((item) => {
      return (
        (item.sentBy === profileEmail && item.sentTo === selectedChatEmail) ||
        (item.sentBy === selectedChatEmail && item.sentTo === profileEmail)
      );
    });

    console.log(filteredList);

    return filteredList;
  };

  return (
    <ChatContext.Provider
      value={{
        profile,
        setProfile,
        selectedChat,
        setSelectedChat,
        socket,
        setSocket,
        conversationList,
        setConversationList,
        getChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
