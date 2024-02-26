import React, { createContext, useState } from "react";

export const ChatContext = React.createContext();

const ChatContextProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    id: 1,
    name: "Jasmine Thompson",
    imageUrl: "https://connectme-html.themeyn.com/images/avatar/1.jpg",
    email: "jasmineThompson@gmail.com",
  });

  const [selectedChat, setSelectedChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const [conversationList, setConversationList] = useState([]);

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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
