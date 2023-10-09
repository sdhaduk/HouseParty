import React from "react";
import {BrowserRouter, Link, Route, Routes, Redirect } from 'react-router-dom';
import CreateRoomPage from "./CreateRoomPage";
import JoinRoomPage from "./JoinRoomPage";

const HomePage = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route index element={<h1>This is the home page</h1>}></Route>
            <Route path="/join" element={<JoinRoomPage />} />
            <Route path="/create" element={<CreateRoomPage />} />
        </Routes>
    </BrowserRouter>    
    )
}

export default HomePage;
