import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: "1rem",
    display: "flex!important",
    padding: "16px",
    background: "white!important",
  },
  pagination: {
    borderRadius: 4,
    marginTop: "1rem!important",
    padding: "16px!important",
  },
  gridContainer: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse!important",
    },
  },
}));
