import { deepPurple } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex!important",
    flexDirection: "row!important",
    justifyContent: "space-between!important",
    alignItems: "center!important",
    padding: "10px 50px",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    textDecoration: "none",
  },
  image: {
    marginLeft: "15px",
  },
  toolbar: {
    display: "flex!important",
    justifyContent: "flex-end",
    width: "400px",
  },
  profile: {
    display: "flex!important",
    justifyContent: "space-between",
    width: "400px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  brandContainer: {
    display: "flex!important",
    alignItems: "center",
    gap: "10px",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));
