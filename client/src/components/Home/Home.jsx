import { Container, Grid, Grow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { getPosts } from '../../redux/actions/posts';
import { useDispatch } from 'react-redux';
import useStyles from './styles.js'

function Home() {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
            <Container maxWidth="xl">
              <Grid
                container
                justify="space-between"
                alignItems="stretch"
                spacing="3"
                className={classes.mainContainer}
              >
                <Grid item xs={12} md={8}>
                  <Posts setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Form currentId={currentId} setCurrentId={setCurrentId} />
                </Grid>
              </Grid>
            </Container>
          </Grow>
  )
}

export default Home