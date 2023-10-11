import React from "react";
import {BrowserRouter, Link, Route, Routes, Redirect } from 'react-router-dom';
import CreateRoomPage from "./CreateRoomPage";
import JoinRoomPage from "./JoinRoomPage";
import Room from "./Room";

const HomePage = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route index element={<h1>This is the home page</h1>}></Route>
            <Route path="/join" element={<JoinRoomPage />} />
            <Route path="/create" element={<CreateRoomPage />} />
            <Route path="/room/:roomCode" element={<Room />} />
        </Routes>
    </BrowserRouter>    
    )
};

export default HomePage;
