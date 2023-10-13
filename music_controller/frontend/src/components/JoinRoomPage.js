import React, { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
} from "@material-ui/core/";
import { Link, useNavigate } from "react-router-dom";

const JoinRoomPage = () => {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  function handleButtonPress() {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        code: roomCode
      })
    };

    fetch('/api/join-room', requestOptions)
    .then((response) => {
      if(response.ok){
        navigate(`/room/${roomCode}`)
      } else {
        setError(true);
        setErrorMessage('Room not found');
      }
    }).catch((error) =>  console.log(error))
  };

  return (
    <Grid container spacing={1} align="center">
      <Grid item xs={12}>
        <Typography variant="h4" component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          error={error}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomCode}
          helperText={errorMessage}
          variant="outlined"
          onChange={(e) => setRoomCode(e.target.value)} 
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleButtonPress}>
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="secondary" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default JoinRoomPage;
