import React, { createContext, useState, useEffect } from "react";

export const ChatContext = React.createContext();

const ChatContextProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  const [selectedChat, setSelectedChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const [conversationList, setConversationList] = useState([]);

  const getChats = (profileEmail, selectedChatEmail) => {
    const filteredList = conversationList.filter((item) => {
      return (
        (item.sentBy === profileEmail && item.sentTo === selectedChatEmail) ||
        (item.sentBy === selectedChatEmail && item.sentTo === profileEmail)
      );
    });

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
