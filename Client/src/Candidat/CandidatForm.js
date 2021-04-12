import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, Grid, Paper } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";


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
  const {ADRESSE_CANDIDAT,DATE_NAIS_CANDIDAT,LIEU_NAIS_CANDIDAT,NIVEAU_SCOL_CANDIDAT,NOM_CANDIDAT,NUMERO_CANDIDAT,PRENOM_CANDIDAT,PRENOM_PERE,SEX_CONDIDAT}= props.values;
  const [selectedDate, setSelectedDate] = useState(DATE_NAIS_CANDIDAT);
  const [numeroCandidat, setnumeroCandidat] = useState(NUMERO_CANDIDAT);
  const [Nom, setNom] = useState(NOM_CANDIDAT);
  const [Prenom, setPrenom] = useState(PRENOM_CANDIDAT);
  const [PrenomPere, setPrenomPere] = useState(PRENOM_PERE);
  const [Lieu, setLieu] = useState(LIEU_NAIS_CANDIDAT);
  const [Niveau, setNiveau] = useState(NIVEAU_SCOL_CANDIDAT);
  const [Adresse, setAdresse] = useState(ADRESSE_CANDIDAT);
  const [Sexe, setSexe] = useState(SEX_CONDIDAT);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const handleSexeChange = (event) => {
    setSexe(event.target.value);
  };

// convertir le format de la Date en yyyy-mm-dd
  function convert(date){
    const current_datetime = new Date(date);
    
    const m =  current_datetime.getMonth() +1 ;
    if (m > 9) {
     return ( current_datetime.getFullYear() + "-" + (m) + "-" + current_datetime.getDate())
    }else{
      return (current_datetime.getFullYear() + "-" + 0 + (m) + "-" + current_datetime.getDate())
    }
  }

const Enregister =()=>{
  if(Nom === '' || Prenom ==='' || selectedDate === '' || Lieu ==='' || Niveau === '' || Adresse ==='' || PrenomPere ==='' || Sexe ===''){
    alert("Merci de remplir tout les champs")
  }else{
    props.onClick(
      numeroCandidat,
      Nom,
      Prenom,
      selectedDate,
      Lieu,
      Niveau,
      Adresse,
      PrenomPere,
      Sexe
    );
    props.Close(false);
}
 

  }

  return (
    <>
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
                value={convert(selectedDate)}
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
          </Grid>
        </form>
      </Paper>
    </>
  );
}
