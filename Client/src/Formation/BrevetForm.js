import { Button, Grid, makeStyles, Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Controls from "../components/controls/Controls";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
      margin: theme.spacing(1),
    },
    "& .MuiButtonBase-root": {
      width: "44%",
      margin: theme.spacing(1),
    },
  },
  group: {
    width: "auto",
    height: "auto",
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  pageContent: {
    margin: theme.spacing(0),
    padding: theme.spacing(1),
    width: 300,
    height: "auto",
  },
}));
export default function BrevetForm(props) {
  const classes = useStyles();
  const [Brevet, setBrevet] = useState();
  const [LivBrevt, setLivBrevt] = useState();
  const [ExpBrevet, setExpBrevet] = useState();

  const { NUMERO_FORMATION, NUMERO_CANDIDAT, GROUPE } = props.values;

  function convert(date) {
    const current_datetime = new Date(date);

    const m = current_datetime.getMonth() + 1;
    if (m > 9) {
      return (
        current_datetime.getFullYear() +
        "-" +
        m +
        "-" +
        current_datetime.getDate()
      );
    } else {
      return (
        current_datetime.getFullYear() +
        "-" +
        0 +
        m +
        "-" +
        current_datetime.getDate()
      );
    }
  }
  
  const Enregister = () => {
    try {
      if (Brevet === "" || LivBrevt === "" || ExpBrevet === "") {
        alert("Merci de remplir tout les champs");
      } else {
        props.onClick(Brevet, convert(LivBrevt), convert(ExpBrevet), NUMERO_CANDIDAT, NUMERO_FORMATION, GROUPE);
        alert("Modifié avec succés")
        props.Close(false);
      }
    } catch (error) {
      console.log(error)
    }
 
  };
  return (
    <Paper className={classes.pageContent}>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Numéro du Brevet"
              value={Brevet}
              size="small"
              className={classes.textField}
              onChange={(e) => setBrevet(e.target.value)}
            />
            <Controls.DatePicker
              label="Date de Livraison"
              value={LivBrevt}
              onChange={setLivBrevt}
            />
            <Controls.DatePicker
              label="Date d'expiration"
              value={ExpBrevet}
              onChange={setExpBrevet}
            />
            <Button
              variant="contained"
              color="Primary"
              size="small"
              onClick={Enregister}
            >
              Enregister
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => {
                props.Close(false);
              }}
            >
              Annuler
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
