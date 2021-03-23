import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
        height: '100vh',
      },
  image: {
    backgroundImage: "url(https://www.exp.com/wp-content/uploads/2019/05/vaudreuil_office_latest.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));

export default function Welcome() {
const classes = useStyles();
  return (
  <Grid container component="main" className={classes.root}>
  
  </Grid>
  );
};
