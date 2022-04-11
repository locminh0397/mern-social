import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { getPosts } from "../../redux/actions/posts";
import { useDispatch, useSelector } from "react-redux";

function PaginationPage({page}) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const {numberOfPage} = useSelector(state => state.posts)
  useEffect(() => {
    if(page) dispatch(getPosts(page))
  }, [dispatch, page]);

  return (
    <Pagination
      className={classes.ul }
      count={numberOfPage}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
      )}
    ></Pagination>
  );
}

export default PaginationPage;
