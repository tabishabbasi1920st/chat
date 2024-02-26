import "./App.css";
import Chat from "./components/Chat.js";
import Register from "./components/Register.js";
import Login from "./components/Login.js";
import Home from "./components/Home.js";
import { Route, Routes } from "react-router-dom";
import ChatContextProvider from "./components/ChatContext.js";

export default function App() {
  return (
    <ChatContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </ChatContextProvider>
  );
}
