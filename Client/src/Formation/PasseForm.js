import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";


const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "90%",
      margin: theme.spacing(1),
    },
    "& .MuiButtonBase-root": {
      width: "40%",
      margin: theme.spacing(1),
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  pageContent: {
    margin: theme.spacing(0),
    padding: theme.spacing(2),
    height: 300,
    width: 300,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function PasseFrom(props) {
  const classes = useStyles();

  const { NUMERO_FORMATION, NUMERO_CANDIDAT, GROUPE, NOTE, REMARQUE } = props.values;

  const [numeroFormation] = useState(NUMERO_FORMATION);
  const [numeroCandidat ] = useState(NUMERO_CANDIDAT);
  const [note, setNote] = useState(NOTE);
  const [remarque, setRemarque] = useState(REMARQUE);
  const [groupe, setGroupe]=useState(GROUPE); 

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };
  const handleRemarqueChange = (e) => {
    setRemarque(e.target.value);
  };

  const handleGroupeChange = (e) => {
    setGroupe(e.target.value);
  };

  const Enregister = () => {
    try {
      if (note === "" || remarque === "") {
        alert("Merci de remplir tout les champs");
      } else {
        props.onClick(remarque, note, groupe, numeroCandidat, numeroFormation, GROUPE);
        alert("Modifié avec succés")
        props.Close(false);
      }
    } catch (error) {
      console.log(error)
    }
 
  };

  return (
    <>
      <Paper className={classes.pageContent}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container spacing={2}>
          <TextField
              variant="outlined"
              label="Groupe"
              size="small"
              type="number"
              value={groupe}
              onChange={handleGroupeChange}
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Remarque</InputLabel>
              <Select
                labelId="demo-simple-select"
                id="demo-simple-select"
                value={remarque}
                onChange={handleRemarqueChange}
              >
                <MenuItem value={"ناجح"}>ناجح </MenuItem>
                <MenuItem value={"مؤجل"}> مؤجل </MenuItem>
                <MenuItem value={"راسب"}>راسب</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              label="Note"
              size="small"
              type="number"
              value={note}
              onChange={handleNoteChange}
            />
            <Button
              variant="contained"
              color="primary"
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
        </form>
      </Paper>
    </>
  );
}
