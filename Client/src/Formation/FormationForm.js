import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Controls from "../components/controls/Controls";
import TableCandForm from "../Candidat/TableCandForm";


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

export default function Form(props) {
  const classes = useStyles();

  const { NUMERO_FORMATION, TYPE_FORMATION, DEBUT, FIN } = props.values;

  const [numeroFormation, setNumeroFormation] = useState(NUMERO_FORMATION);
  const [typeFormation, setTypeFormation] = useState(TYPE_FORMATION);
  const [debut, setDebut] = useState(DEBUT);
  const [fin, setFin] = useState(FIN);

  const handleDateDebutChange = (e) => {
    setDebut(e.target.value);
  };
  const handleDateFinChange = (e) => {
    setFin(e.target.value);
  };
  const handleTypeChange = (e) => {
    setTypeFormation(e.target.value);
  };

  const handleInputChange = (e) => {
    setDebut(convert(e.target.value));
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

  const Enregister = () => {
    const dt1 = new Date(debut);
    const dt2 = new Date(fin);

    if (typeFormation === "" || debut === "" || fin === "") {
      alert("Merci de remplir tout les champs");
    } else {
      if (dt1 >= dt2) {
        alert("Date debut du formation est supèrieur au date fin ");
      } else {
        props.onClick(numeroFormation, typeFormation, convert(debut), convert(fin));
        alert(numeroFormation + "" + typeFormation + "" + debut + "" + fin);
        props.Close(false);
      }
    }
  };

  return (
    <>
      <Paper className={classes.pageContent}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">
                Type formation
              </InputLabel>
              <Select
                labelId="demo-simple-select"
                id="demo-simple-select"
                value={typeFormation}
                onChange={handleTypeChange}
              >
                <MenuItem value={"نقل البضائع"}>نقل البضائع</MenuItem>
                <MenuItem value={"نقل المسافرين"}>نقل المسافرين</MenuItem>
                <MenuItem value={"نفل المواد الخطيرة"}>
                  نفل المواد الخطيرة
                </MenuItem>
              </Select>
            </FormControl>
            <Controls.DatePicker
              label="Date debut"
              value={debut}
              onChange={setDebut}
            />
            <Controls.DatePicker
              label="Date fin"
              value={fin}
              onChange={setFin}
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
