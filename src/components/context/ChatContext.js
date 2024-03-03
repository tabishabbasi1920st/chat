import React, { useState, useEffect } from "react";

export const ChatContext = React.createContext();

const ChatContextProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const [fullImageModal, setFullImageModal] = useState(false);
  const [fullImageUrl, setFullImageUrl] = useState(null);

  return (
    <ChatContext.Provider
      value={{
        profile,
        setProfile,
        selectedChat,
        setSelectedChat,
        socket,
        setSocket,
        fullImageModal,
        setFullImageModal,
        fullImageUrl,
        setFullImageUrl,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
