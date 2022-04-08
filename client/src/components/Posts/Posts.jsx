import React from "react";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@mui/material";
import Post from "./Post/Post";

function Posts({ setCurrentId }) {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();
  return !posts?.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts?.map((post) => (
        <Grid key={post._id} item xs={12} md={6} lg={4}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Posts;