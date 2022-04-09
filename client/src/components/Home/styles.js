import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  [theme.breakpoints.down("md")]: {
    mainContainer: {
      flexDirection: "column-reverse!important"

    },
  },
}));
