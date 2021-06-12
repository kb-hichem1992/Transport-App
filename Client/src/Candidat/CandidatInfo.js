import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "auto",
      margin: theme.spacing(1),
    },
    "& .MuiDialog-paper-root": {
      width: "auto",
      margin: theme.spacing(1),
    },
    "& .MuiButtonBase-root": {
      width: "38%",
      margin: theme.spacing(1),
    },
  },
  pageContent: {
    margin: theme.spacing(0),
    padding: theme.spacing(1),
    width: 850,
    height: "auto",
  },
}));

export default function CandidatInfo(props) {
  const classes = useStyles();
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
  } = props.values;

  return (
    <>
      <Paper className={classes.pageContent}>
        <Grid container className={classes.root} spacing={3}>
          <Grid item xs={6}>
            <Typography  color ="textSecondary" variant="h6"  paragraph={true}>
              N° inscription : <Typography color="textPrimary"  variant="h6"  display="inline" paragraph={true}>{NUM_INS}</Typography>
            </Typography>
            <Typography  color ="textSecondary" variant="h6"  paragraph={true}>
              Date d'inscription : <Typography color="textPrimary"  variant="h6"  display="inline" paragraph={true}>{convert(DATE_INS)}</Typography>
            </Typography>
            <Typography  color ="textSecondary" variant="h6"  paragraph={true}>
              Nom : <Typography color="textPrimary"  variant="h6"  display="inline" paragraph={true}>{NOM_CANDIDAT}</Typography>
            </Typography>
            <Typography color ="textSecondary" variant="h6" paragraph={true}>
              Prénom : <Typography color="textPrimary"  variant="h6"  display="inline" paragraph={true}>{PRENOM_CANDIDAT}</Typography>
            </Typography>
            <Typography color ="textSecondary" variant="h6"  paragraph={true}>
              Prénom du Père : <Typography color="textPrimary"  variant="h6"  display="inline" paragraph={true}>{PRENOM_PERE}</Typography>
            </Typography>
            <Typography color ="textSecondary" variant="h6"  paragraph={true}>
              Date de Naissance :<Typography color="textPrimary"  variant="h6"  display="inline" paragraph={true}>{convert(DATE_NAIS_CANDIDAT)}</Typography>
            </Typography>
            <Typography color ="textSecondary" variant="h6"  paragraph={true}>
              Lieu de Naissance :<Typography color="textPrimary"  variant="h6"  display="inline" paragraph={true}>{LIEU_NAIS_CANDIDAT}</Typography>
            </Typography>
            <Typography color ="textSecondary" variant="h6"   paragraph={true}>
              Sexe : <Typography color="textPrimary"  variant="h6"  display="inline" paragraph={true}>{SEX_CONDIDAT}</Typography>
            </Typography>
            <Typography color ="textSecondary" variant="h6"   paragraph={true}>
              Niveau: <Typography color="textPrimary"  variant="h6"  display="inline" paragraph={true}>{NIVEAU_SCOL_CANDIDAT}</Typography>
            </Typography>
            <Typography color ="textSecondary" variant="h6"  paragraph={true}>
              Adresse: <Typography color="textPrimary"  variant="h6"  display="inline" paragraph={true}>{ADRESSE_CANDIDAT}</Typography>
            </Typography>
            <Typography color ="textSecondary" variant="h6"  paragraph={true}>
              Type de candidat: <Typography color="textPrimary"  variant="h6"  display="inline" paragraph={true}>{TYPE_CANDIDAT}</Typography>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color ="textSecondary" variant="h6"  paragraph={true}>
              N° de Permis : <Typography color="textPrimary"  variant="h6"  display="inline" paragraph={true}>{NUM_PERMIS}</Typography>
            </Typography>
            <Typography color ="textSecondary" variant="h6"   paragraph={true}>
              Date de Livraison : <Typography color="textPrimary"  variant="h6"  display="inline" paragraph={true}>{convert(DATE_LIV_PERMIS)}</Typography>
            </Typography>
            <Typography color ="textSecondary" variant="h6"  paragraph={true}>
              Date d'expiration : <Typography color="textPrimary"  variant="h6"  display="inline" paragraph={true}>{convert(DATE_EXP_PERMIS)}</Typography>
            </Typography>
            <Typography color ="textSecondary" variant="h6" paragraph={true}>
              Catégorie : <Typography color="textPrimary"  variant="h6"  display="inline" paragraph={true}>{CATEGORIE_PERMIS}</Typography>
            </Typography>
            <Typography color ="textSecondary" variant="h6" paragraph={true}>
              Type : <Typography color="textPrimary"  variant="h6"  display="inline" paragraph={true}>{TYPE_PERMIS}</Typography>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
