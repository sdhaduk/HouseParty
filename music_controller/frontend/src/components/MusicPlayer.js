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

  return (
    <Card>
      <Grid container align="center">
        <Grid item xs={4}>
          <img src={song.image_url} height="100%" width="100%" />
        </Grid>
        <Grid item xs={8}>
          <Typography component="h5" variant="h5">
            {song.title}
          </Typography>

          <Typography color="textSecondary" variant="subtitle1">
            {song.artists}
          </Typography>

          <div>
            <IconButton>
              {song.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>

            <IconButton>
              <SkipNextIcon />
            </IconButton>
          </div>

        </Grid>
      </Grid>
      <LinearProgress variant="determinate" value={songProgress} />
    </Card>
  );
};

export default MusicPlayer;
