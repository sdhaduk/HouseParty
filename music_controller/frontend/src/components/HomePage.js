import React from "react";
import {BrowserRouter, Link, Route, Routes, Redirect } from 'react-router-dom';
import CreateRoomPage from "./CreateRoomPage";
import JoinRoomPage from "./JoinRoomPage";
import Room from "./Room";
import HomePageStyle from './HomePageStyle';

const HomePage = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route index element={<HomePageStyle />} />
            <Route path="/join" element={<JoinRoomPage />} />
            <Route path="/create" element={<CreateRoomPage />} />
            <Route path="/room/:roomCode" element={<Room />} />
        </Routes>
    </BrowserRouter>    
    ) 
};

export default HomePage;
