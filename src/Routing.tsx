import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router";
import { User } from "./dto/user";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import { Login } from "./pages/Login";

import Signup from "./pages/Signup";

export const Routing = () => {
  const user = useSelector((state: User) => state);
  const navigate = useNavigate();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};
