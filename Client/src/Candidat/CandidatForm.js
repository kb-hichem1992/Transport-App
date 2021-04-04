import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "date-fns";
import { Button, Grid, Paper } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import PageHeader from "../PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
    "& .MuiButtonBase-root": {
      width: "38%",
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
    height: 350,
  },
}));

export default function Candidat(props) {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState("");
  const [numeroCandidat, setnumeroCandidat] = useState("");
  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [PrenomPere, setPrenomPere] = useState("");
  const [Lieu, setLieu] = useState("");
  const [Niveau, setNiveau] = useState("");
  const [Adresse, setAdresse] = useState("");
  const [Sexe, setSexe] = useState("");

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const handleSexeChange = (event) => {
    setSexe(event.target.value);
  };

  const addCondidat = () => {
    Axios.post("http://localhost:3001/Add_condidat", {
      Nom: Nom,
      Prénom: Prenom,
      Date_naissance: selectedDate,
      Lieu_naissance: Lieu,
      Niveau: Niveau,
      Adresse: Adresse,
      Prénom_Pére: PrenomPere,
      Sexe: Sexe,
    }).then(alert("Condidat ajouté"));
  };
  const updateCandidat = (id) => {
    Axios.put("http://localhost:3001/update_candidat", {
      numeroCandidat: numeroCandidat,
      Nom: Nom,
      Prénom: Prenom,
      Date_naissance: selectedDate,
      Lieu_naissance: Lieu,
      Niveau: Niveau,
      Adresse: Adresse,
      Prénom_Pére: PrenomPere,
    }).then(console.log("Modifié"));
  };

  return (
    <>
      <PageHeader
        title="Candidat"
        subTitle="Ajouter Condidat"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Nom du condidat"
                value={Nom}
                size="small"
                onChange={(e) => setNom(e.target.value)}
              />
              <TextField
                variant="outlined"
                label="Prénom du condidat"
                size="small"
                value={Prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
              <TextField
                variant="outlined"
                label="Prénom du père"
                size="small"
                value={PrenomPere}
                onChange={(e) => setPrenomPere(e.target.value)}
              />
              <TextField
                variant="outlined"
                label="Adresse"
                value={Adresse}
                size="small"
                onChange={(e) => setAdresse(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Lieu de naissance"
                value={Lieu}
                size="small"
                onChange={(e) => setLieu(e.target.value)}
              />
              <TextField
                id="date"
                label="Date de naissance"
                type="date"
                onChange={handleDateChange}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                variant="outlined"
                label="Niveau scolaire"
                value={Niveau}
                size="small"
                onChange={(e) => setNiveau(e.target.value)}
              />
              <FormControl component="fieldset">
                <FormLabel component="legend">Sexe</FormLabel>
                <RadioGroup
                  row
                  aria-label="Sexe"
                  name="gender1"
                  value={Sexe}
                  onChange={handleSexeChange}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => {
                    props.Add(
                      Nom,
                      Prenom,
                      selectedDate,
                      Lieu,
                      Niveau,
                      Adresse,
                      PrenomPere,
                      Sexe
                    );
                  }}
                >
                  Enregister
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => {
                    alert(selectedDate);
                  }}
                >
                  Annuler
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
}
