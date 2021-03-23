import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./AppFor.css";
import TableFor from "./TableFor.js";

require("es6-promise").polyfill();
require("isomorphic-fetch");
function AppFor({id}) {
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch(id)
      .then((response) => response.json())
      .then((json) => setdata(json));
  }, [id, setdata ]);
  const useStyles = makeStyles((theme) => ({
    root: {
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    formControl: {
      display: "inline-flex",
      margin: theme.spacing(2),
      minWidth: 170,
    },
    container: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      display: "flex",
      justifyContent: "space-between",
    },
  }));  
  const classes = useStyles();
  return (
    <>
      <div className = {classes.root}> Liste des Formations</div>
      <div className={classes.container}>
        <TableFor data={data} />
      </div>
    </>
  );
}
export default AppFor;
