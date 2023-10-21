import React from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';


const MusicPlayer = ({ song }) => {
  const songProgress = (song.time / song.duration) * 100;

  const pauseSong = () => {
    const requestOptions = {
      'method': 'PUT',
      'headers': {'Content-Type': 'application/json'}
    };
     fetch('/spotify/pause', requestOptions)
  };

  const playSong = () => {
    const requestOptions = {
      'method': 'PUT',
      'headers': {'Content-Type': 'application/json'}
    };
     fetch('/spotify/play', requestOptions)
  };

  const skipSong = () => {
    const requestOptions = {
      'method': 'POST',
      'headers': {'Content-Type': 'application/json'}
    };
    fetch('/spotify/skip', requestOptions)
  };

  return (
    <div style={{ display:'flex', justifyContent:'center' }}>
    <Card>
      <Grid container alignItems="center">
        <Grid item align='center' xs={4}>
          <img src={song.image_url} height="100%" width="100%" />
        </Grid>
        <Grid item align='center' xs={8}>
          <Typography component="h5" variant="h5">
            {song.title}
          </Typography>

          <Typography color="textSecondary" variant="subtitle1">
            {song.artists}
          </Typography>

          <div>
            <IconButton
            onClick={() => song.is_playing ?  pauseSong() : playSong()}
            >
              {song.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>

            <IconButton
            onClick={() => skipSong()}
            >
              <SkipNextIcon />
            </IconButton> 
          </div>

        </Grid>
      </Grid>
      <LinearProgress variant="determinate" value={songProgress} />
    </Card>
    </div>
  );
};

export default MusicPlayer;
