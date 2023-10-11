import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Room = () => {

  const [voteToSkip, setVoteToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const { roomCode } = useParams();

  function getRoomDetails() {
    fetch("/api/get-room" + "?code=" + roomCode).then((response) => 
    response.json()
    ).then((data) => {
        setVoteToSkip(data.votes_to_skip)
        setGuestCanPause(data.guest_can_pause)
        setIsHost(data.is_host)
    }); 
  };

  getRoomDetails();
 
  return (
    <div>
      <h3>{'Room Code: ' + roomCode}</h3>
      <p>{'Votes to skip: ' + voteToSkip}</p>
      <p>{'Guests can pause: '+ guestCanPause}</p>
      <p>{'Is host: ' + isHost}</p>
    </div>
  );
};

export default Room;
