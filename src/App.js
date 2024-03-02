import "./App.css";
import Register from "./components/register/index.js";
import Login from "./components/login/index.js";
import Home from "./components/home/index.js";
import { Route, Routes } from "react-router-dom";
import ChatContextProvider from "./components/context/ChatContext.js";

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
