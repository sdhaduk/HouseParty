import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Room = () => {
const [voteToSkip, setVoteToSkip] = useState(2);
const [guestCanPause, setGuestCanPause] = useState(false);
const [isHost, setIsHost] = useState(false);
const { roomCode } = useParams();



  return (
    <div>
    <h3>{roomCode}</h3>
    <p>{voteToSkip}</p>
    <p>{guestCanPause}</p>
    <p>{isHost}</p>
    </div>
  )
}

export default Room;