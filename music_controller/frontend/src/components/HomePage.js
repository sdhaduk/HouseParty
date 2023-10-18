import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import JoinRoomPage from "./JoinRoomPage";
import Room from "./Room";
import HomePageStyle from "./HomePageStyle";

const HomePage = () => {
  const [roomCode, setRoomCode] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function autoEnter() {
      fetch("/api/user-in-room")
        .then((response) => response.json())
        .then((data) => {
          if (data.code != null) {
            setRoomCode(data.code);
          }
        });
    }
    autoEnter();
  }, []);

  const CheckSession = () => {
    if (roomCode) {
        return navigate(`/room/${roomCode}`)
    } else {
        return (<HomePageStyle />)
    }
  };

  const clearRoomCode = () => {
    setRoomCode(null);
  }

  return (
      <Routes>
        <Route path="/" element={ CheckSession() } />
        <Route path="/join" element={<JoinRoomPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route path="/room/:roomCode" element={<Room leaveRoom = {clearRoomCode} />} />
      </Routes>
  );
};

export default HomePage;
  