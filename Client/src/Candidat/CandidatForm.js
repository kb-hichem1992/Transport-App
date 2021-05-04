import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Controls from "../components/controls/Controls";
import { TramOutlined, TrendingUpRounded } from "@material-ui/icons";

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
    width: "auto",
    height: "auto",
  },
}));

export default function Candidat(props) {
  const classes = useStyles();
  const textField = useRef(null);

  const {
    ADRESSE_CANDIDAT,
    DATE_NAIS_CANDIDAT,
    LIEU_NAIS_CANDIDAT,
    NIVEAU_SCOL_CANDIDAT,
    NOM_CANDIDAT,
    NUMERO_CANDIDAT,
    PRENOM_CANDIDAT,
    PRENOM_PERE,
    SEX_CONDIDAT,
    NUM_PERMIS,
    DATE_LIV_PERMIS,
    DATE_EXP_PERMIS,
    CATEGORIE_PERMIS,
    TYPE_PERMIS,
  } = props.values;

  const [selectedDate, setSelectedDate] = useState(DATE_NAIS_CANDIDAT);
  const [numeroCandidat, setnumeroCandidat] = useState(NUMERO_CANDIDAT);
  const [Nom, setNom] = useState(NOM_CANDIDAT);
  const [Prenom, setPrenom] = useState(PRENOM_CANDIDAT);
  const [PrenomPere, setPrenomPere] = useState(PRENOM_PERE);
  const [Lieu, setLieu] = useState(LIEU_NAIS_CANDIDAT);
  const [Niveau, setNiveau] = useState(NIVEAU_SCOL_CANDIDAT);
  const [Adresse, setAdresse] = useState(ADRESSE_CANDIDAT);
  const [Sexe, setSexe] = useState(SEX_CONDIDAT);
  const [Typepermis, setTypePermis] = useState(TYPE_PERMIS);
  const [NumPermis, setNumPermis] = useState(NUM_PERMIS);
  const [LivPermis, setLivPermis] = useState(DATE_LIV_PERMIS);
  const [ExpPermis, setExpPermis] = useState(DATE_EXP_PERMIS);
  const [CategoriePermis, setCategoriePermis] = useState(CATEGORIE_PERMIS);
  const [textChanged, setTextChanged] = useState(false);

  const handleSexeChange = (event) => {
    setSexe(event.target.value);
  };
  const handleTypePermisChange = (event) => {
    setTypePermis(event.target.value);
  };
  const handleCategoriePermisChange = (event) => {
    setCategoriePermis(event.target.value);
  };

  // convertir le format de la Date en yyyy-mm-dd
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

  function CandidatExists(id) {
    return props.data.some(function (el) {
      if (el.NUM_PERMIS === id) {
        return true;
      } else {
        return false;
      }
    });
  }

  const Enregister = () => {
    const dt1 = new Date(selectedDate);
    const dt2 = new Date(LivPermis);
    const dt3 = new Date(ExpPermis);
    const dt0 = new Date();

    if (
      Nom === "" ||
      Prenom === "" ||
      selectedDate === "" ||
      Lieu === "" ||
      Niveau === "" ||
      Adresse === "" ||
      PrenomPere === "" ||
      Sexe === "" ||
      NumPermis === "" ||
      LivPermis === "" ||
      ExpPermis === "" ||
      CategoriePermis === "" ||
      Typepermis === ""
    ) {
      alert("Merci de remplir tout les champs");
    } else if (dt1.getDate() >= dt0.getDate()) {
      alert("Date de naissance erronée");
    } else if (dt2.getDate() >= dt3.getDate()) {
      alert("Date de livraison erronée");
    } else if (
      CandidatExists(NumPermis) === true &&
      props.onClick.name === "addCondidat"
    ) {
      alert("Candidat existe déja");
    } else if (
      CandidatExists(NUM_PERMIS) === true &&
      props.onClick.name === "updateCandidat" &&
      textChanged === true
    ) {
      alert("Candidat existe déja");
    } else {
      props.onClick(
        numeroCandidat,
        Nom,
        Prenom,
        convert(selectedDate),
        Lieu,
        Niveau,
        Adresse,
        PrenomPere,
        Sexe,
        NumPermis,
        convert(LivPermis),
        convert(ExpPermis),
        CategoriePermis,
        Typepermis
      );
      props.Close(false);
    }
  };

  const categorie1 = ["A", "B", "C"];
  const categorie2 = ["D", "E", "F"];
  const niveauScolaire = ["ابتدائي", "متوسط", "ثانوي", "جامعي"];

  return (
    <>
      <Paper className={classes.pageContent}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container spacing={2}>
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
              <TextField
                variant="outlined"
                label="Lieu de naissance"
                value={Lieu}
                size="small"
                onChange={(e) => setLieu(e.target.value)}
              />
              <Controls.DatePicker
                label="Date de naissance"
                value={selectedDate}
                onChange={setSelectedDate}
              />
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Niveau scolaire
                </InputLabel>
                <Select
                  labelId="demo-simple-select"
                  id="demo-simple-select"
                  value={Niveau}
                  onChange={(e) => setNiveau(e.target.value)}
                >
                  {niveauScolaire.map((niveau) => {
                    return <MenuItem value={niveau}> {niveau}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              <FormControl component="fieldset">
                <FormLabel component="legend">Sexe</FormLabel>
                <RadioGroup
                  row
                  aria-label="Sexe"
                  name="gender1"
                  value={Sexe}
                  className={classes.group}
                  onChange={handleSexeChange}
                >
                  <FormControlLabel
                    value="أنثى"
                    control={<Radio />}
                    label="انثى"
                  />
                  <FormControlLabel
                    value="ذكر"
                    control={<Radio />}
                    label="ذكر"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="N° du permis de conduire"
                value={NumPermis}
                size="small"
                onChange={(e) => {
                  setNumPermis(e.target.value);
                  setTextChanged(true);
                }}
                ref={textField}
              />
              <Controls.DatePicker
                label="Date de livraison"
                value={LivPermis}
                onChange={setLivPermis}
              />
              <Controls.DatePicker
                label="Date d'expiration"
                value={ExpPermis}
                onChange={setExpPermis}
              />
              <FormControl component="fieldset">
                <FormLabel component="legend">Type de Permis</FormLabel>
                <RadioGroup
                  row
                  className={classes.group}
                  aria-label="TypePermis"
                  name="Permis"
                  value={Typepermis}
                  onChange={handleTypePermisChange}
                >
                  <FormControlLabel
                    value="Biometrique"
                    control={<Radio />}
                    label="Biometrique"
                  />
                  <FormControlLabel
                    value="Normal"
                    control={<Radio />}
                    label="Normal"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Catégorie Permis
                </InputLabel>
                <Select
                  labelId="demo-simple-select"
                  id="demo-simple-select"
                  value={CategoriePermis}
                  onChange={handleCategoriePermisChange}
                >
                  {Typepermis === "Normal"
                    ? categorie1.map((cat) => {
                        return <MenuItem value={cat}> {cat}</MenuItem>;
                      })
                    : categorie2.map((cat) => {
                        return <MenuItem value={cat}> {cat}</MenuItem>;
                      })}
                </Select>
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
