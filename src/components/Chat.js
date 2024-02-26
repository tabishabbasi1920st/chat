// In your Chat component
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const Chat = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [sendTo, setSendTo] = useState("Tabish");

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    newSocket.on("message", (newMessage) => {
      console.log(newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    newSocket.on("privateMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    newSocket.emit("setUsername", username);

    return () => {
      newSocket.disconnect();
    };
  }, [username]);

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      socket.emit("privateMessage", {
        username,
        text: messageInput,
        targetedUsername: "Abbasi",
      });
      setMessageInput("");
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message}</strong>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
