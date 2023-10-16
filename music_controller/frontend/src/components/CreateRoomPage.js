import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Collapse from "@material-ui/core/Collapse";
import { Form, Link, useNavigate } from "react-router-dom";


const CreateRoomPage = ({
  voteToSkipProp,
  guestCanPauseProp,
  updateProp,
  roomCodeProp,
}) => {
  const [guestCanPause, setGuestCanPause] = useState(guestCanPauseProp);
  const [voteToSkip, setVoteToSkip] = useState(voteToSkipProp);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleCreateRoomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: voteToSkip,
        guest_can_pause: guestCanPause,
      }),
    };

    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => navigate(`/room/${data.code}`));
  };

  const handleUpdateRoomButtonPressed = () => {
    const requestOptions = {
      method: "PATCH", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: voteToSkip,
        guest_can_pause: guestCanPause,
        code: roomCodeProp,
      }), 
    };

    fetch("/api/update-room", requestOptions)
      .then((response) => {
         if(response.ok) {
          setSuccessMsg('Room Updated Successfully!  ');
         } else {
          setErrorMsg('Error Updating Room');
         }
      });
  };

  const renderCreateButtons = () => {
    return (
      <Grid container spacing={1} align="center">
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleCreateRoomButtonPressed}
          >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  };

  const renderUpdateButtons = () => {
    return (
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleUpdateRoomButtonPressed}
        >
          Update Room 
        </Button>
      </Grid>
    );
  };

  const title = updateProp ? "Update Room" : "Create a Room";

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Collapse in={errorMsg != ' ' || successMsg != ''}>
           {setSuccessMsg != '' ? successMsg : errorMsg}
        </Collapse> 
      </Grid> 
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText component="div">
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup
            row
            value={guestCanPause.toString() || true.toString()}
            onChange={(e) => { 
              setGuestCanPause(e.target.value === "true" ? true : false);
            }}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            type="number"
            defaultValue={voteToSkip}
            inputProps={{
              min: 1,
              style: { textAlign: "center" },
            }}
            onChange={(e) => {
              setVoteToSkip(e.target.value);
            }}
          />
          <FormHelperText component="div">
            <div align="center">Votes Required to Skip Song</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      {updateProp ? renderUpdateButtons() : renderCreateButtons()}
    </Grid>
  );
};

CreateRoomPage.defaultProps = {
  voteToSkipProp: 2,
  guestCanPauseProp: true,
  updateProp: false,
  roomCodeProp: null,
};

export default CreateRoomPage;
