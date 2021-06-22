import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  Checkbox,
  FormGroup,
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
import AlertDialog from "../components/controls/Dialog";
import Popup from "../components/Popup";
import Opérateur from "../Opérateur/Opérateur";
import axios from "axios";

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
  Div: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
  margin: {
    margin: theme.spacing(1),
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
    NUM_INS,
    PRENOM_CANDIDAT,
    PRENOM_PERE,
    SEX_CONDIDAT,
    NUM_PERMIS,
    DATE_LIV_PERMIS,
    DATE_EXP_PERMIS,
    CATEGORIE_PERMIS,
    TYPE_PERMIS,
    DATE_INS,
    TYPE_CANDIDAT,
    NOM_OP,
  } = props.values;

  const [selectedDate, setSelectedDate] = useState(DATE_NAIS_CANDIDAT);
  const [numeroCandidat, setNumeroCandidat] = useState(NUM_INS);
  const [Date_ins, setDate_ins] = useState(DATE_INS);
  const [Type_candidat, setType_candidat] = useState(TYPE_CANDIDAT);
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
  const [CategoriePermis] = useState(CATEGORIE_PERMIS.split(","));
  const [textChanged, setTextChanged] = useState(false);
  const [open, setOpen] = useState(false);
  const [OpenOperateur, setOpenOperateur] = useState(false);
  const [operateur, setOperateur] = useState(NOM_OP);
  const [CatNormal, setCatNormal] = useState({
    A1: false,
    A2: false,
    B: false,
    C1: false,
    C2: false,
    D: false,
    E: false,
    F: false,
  });
  const [CatNew, setCatNew] = useState({
    A1: false,
    A: false,
    B: false,
    D: false,
    C1: false,
    C: false,
    BE: false,
    C1E: false,
    CE: false,
    DE: false,
    F: false,
  });

  const Normal = Object.keys(CatNormal);
  const New = Object.keys(CatNew);

  const handleCatNormalChange = (event) => {
    setCatNormal({ ...CatNormal, [event.target.name]: event.target.checked });
    if (
      event.target.checked === true &&
      CategoriePermis.includes(event.target.name) === false
    ) {
      CategoriePermis.push(event.target.name);
    }
    console.log(CategoriePermis.toString());
  };
  const handleCatNewChange = (event) => {
    setCatNew({ ...CatNew, [event.target.name]: event.target.checked });
    if (
      event.target.checked === true &&
      CategoriePermis.includes(event.target.name) === false
    ) {
      CategoriePermis.push(event.target.name);
    }
    console.log(CategoriePermis.toString());
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSexeChange = (event) => {
    setSexe(event.target.value);
  };
  const handleTypePermisChange = (event) => {
    setTypePermis(event.target.value);
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
      alert("Champs vides ");
    } else if (convert(dt1) >= convert(dt0)) {
      alert("Date de naissance erronée");
    } else if (convert(dt2) >= convert(dt3)) {
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
      handleClickOpen();
    }
  };
  const affecter_Op = (numeroCandidat, Date_ins, Num_permis, operateur) => {
    axios
      .post("http://localhost:3001/add_travail", {
        numeroCandidat: numeroCandidat,
        Date_ins: Date_ins,
        Num_permis: Num_permis,
        Nom_OP: operateur,
      })
      .then(() => {
        console.log("Ajouter avec succés");
      });
  };
  const niveauScolaire = ["ابتدائي", "متوسط", "ثانوي", "جامعي"];
  const Type = ["عامل", "حر"];

  return (
    <>
      <Paper className={classes.pageContent}>
        <form className={classes.root} noValidate autoComplete="on">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Numéro d'inscription"
                value={numeroCandidat}
                size="small"
                onChange={(e) => setNumeroCandidat(e.target.value)}
              />
              <Controls.DatePicker
                label="Date d'inscription"
                value={Date_ins}
                onChange={setDate_ins}
              />

              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  Type du Candidat
                </InputLabel>
                <Select
                  labelId="demo-simple-select"
                  id="demo-simple-select"
                  value={Type_candidat}
                  onChange={(e) => setType_candidat(e.target.value)}
                >
                  {Type.map((type) => {
                    return (
                      <MenuItem key={type} value={type}>
                        {" "}
                        {type}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

{/*               <Button
                variant="outlined"
                color="primary"
                endIcon={<AddIcon />}
                disabled={
                  Type_candidat === "حر" || Type_candidat === "" ? true : false
                }
                onClick={() => {
                  setOpenOperateur(true);
                }}
                style={{ width: 123, height: 42 }}
              >
                Opérateur
              </Button>
              <TextField
                variant="outlined"
                label="Opérateur"
                value={operateur}
                size="small"
                style={{ width: 193 }}
                inputProps={{ style: { fontSize: 18 }, readOnly: true }}
              />
 */}
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
                    return (
                      <MenuItem key={niveau} value={niveau}>
                        {" "}
                        {niveau}
                      </MenuItem>
                    );
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
              <div className={classes.root}>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">Catégories de permis</FormLabel>
                  <FormGroup row>
                    {Typepermis === "Normal"
                      ? Normal.map((key) => {
                          return (
                            <FormControlLabel
                              key={key}
                              control={
                                <Checkbox
                                  value={key}
                                  name={key}
                                  checked={CatNormal.key}
                                  onChange={(e) => {
                                    handleCatNormalChange(e);
                                  }}
                                />
                              }
                              label={key}
                            />
                          );
                        })
                      : New.map((key) => {
                          return (
                            <FormControlLabel
                              key={key}
                              control={
                                <Checkbox
                                  value={key}
                                  name={key}
                                  checked={CatNew.key}
                                  onChange={(e) => {
                                    handleCatNewChange(e);
                                  }}
                                />
                              }
                              label={key}
                            />
                          );
                        })}
                  </FormGroup>
                </FormControl>
                <TextField
                  variant="outlined"
                  label="Liste des catégoriés"
                  autoFocus={true}
                  defaultValue=""
                  value={CategoriePermis}
                  size="small"
                  inputProps={{ style: { fontSize: 18 }, readOnly: true }}
                />
              </div>
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
                    //  props.Close(false);
                    console.log(NOM_OP);
                  }}
                >
                  Annuler
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <AlertDialog
        title="Confirmation"
        message="Voulez vous enregistrer ?"
        open={open}
        setOpen={setOpen}
        method={() => {
          if (Type_candidat === "عامل" && NOM_OP === "") {
            alert("يجب إختيار المتعامل");
          } else {
            props.onClick(
              numeroCandidat,
              convert(Date_ins),
              Nom,
              Prenom,
              convert(selectedDate),
              Lieu,
              Niveau,
              Adresse,
              PrenomPere,
              Sexe,
              Type_candidat,
              NumPermis,
              convert(LivPermis),
              convert(ExpPermis),
              CategoriePermis.toString(),
              Typepermis
            );
            if (NOM_OP !== "") {
              affecter_Op(numeroCandidat, convert(Date_ins), NumPermis, operateur);
            }
            props.setOpenWindows(false);
          }
        }}
      />
      <Popup
        title="إختيار المتعامل"
        openPopup={OpenOperateur}
        setOpenPopup={setOpenOperateur}
      >
        <Opérateur key="Opérateur" Close={setOpenOperateur} setOp={setOperateur} />
      </Popup>
    </>
  );
}
