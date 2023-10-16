import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Typography, Button } from "@material-ui/core";
import CreateRoomPage from "./CreateRoomPage";

const Room = ({ leaveRoom }) => {
  const [voteToSkip, setVoteToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { roomCode } = useParams();
  const navigate = useNavigate();

  const getRoomDetails = () => {
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => {
        if (!response.ok) {
          leaveRoom();
          navigate("/");
        }
        return response.json();
      })
      .then((data) => {
        setVoteToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
      });
  };

  const leaveButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    fetch("/api/leave-room", requestOptions).then((response) => {
      leaveRoom();
      navigate("/");
    });
  };

  const renderSettingsButton = () => {
    return (
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  };

  const renderSettings = () => {
    return (
    <Grid container spacing={1} align="center">
      <Grid item xs={12}>
        <CreateRoomPage
          updateProp={true}
          voteToSkipProp={voteToSkip}
          guestCanPauseProp={guestCanPause}
          roomCodeProp={roomCode}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowSettings(false)}
        >
          Close
        </Button>
      </Grid>
    </Grid>
    );
  };

  getRoomDetails();

  return showSettings ? (
      renderSettings()
    ) : ( 
    <Grid container spacing={1} align="center">
      <Grid item xs={12}>
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" component="h6">
          Votes: {voteToSkip}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" component="h6">
          Guests Can Pause: {guestCanPause.toString()}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" component="h6">
          Host: {isHost.toString()}
        </Typography>
      </Grid>

      {isHost ? renderSettingsButton() : null}

      <Grid item xs={12}>
        <Button
          variant="contained"
          color="secondary"
          onClick={leaveButtonPressed}
        >
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
};

export default Room;
