import React, { useState, useEffect } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Table from "./test";

require("es6-promise").polyfill();
require("isomorphic-fetch");
function App({id}) {
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch(id)
      .then((response) => response.json())
      .then((json) => setdata(json));
  }, [id, setdata ]);
  const useStyles = makeStyles((theme) => ({
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
      <div className={classes.container}>
        <Table data={data} />
      </div>
    </>
  );
}
export default App;
