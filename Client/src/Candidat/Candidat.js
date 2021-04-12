import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Candidat.css";
import Candidat from "./CandidatForm.js";
import { Paper, Toolbar } from "@material-ui/core";
import {
  GridComponent,
  ColumnDirective,
  ColumnsDirective,
  Page,
  Inject,
  Filter,
  Group,
  Resize,
  Sort,
} from "@syncfusion/ej2-react-grids";
import Axios from "axios";
import Popup from "../components/Popup.js";
import Button from "../components/controls/Button";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from '@material-ui/icons/Delete';
import PageHeader from "../PageHeader";

require("es6-promise").polyfill();
require("isomorphic-fetch");

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
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
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    width: "auto",
  },
  formControl: {
    display: "flex",
    margin: theme.spacing(1),
    minWidth: 170,
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  Button: {
    marginInline: theme.spacing(1),
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default function AppCand({ id }) {
  const [data, setdata] = useState([]);
  const [openAjouter, setOpenAjouter] = useState(false);
  const [openModifier, setOpenModifier] = useState(false);
  const [etat, setEtat] = useState(false);

  useEffect(() => {
    fetch(id)
      .then((response) => response.json())
      .then((json) => setdata(json));
  }, [id, data, etat]);

  const addCondidat = (
    numeroCandidat,
    Nom,
    Prenom,
    Date_naissance,
    Lieu,
    Niveau,
    Adresse,
    PrenomPere,
    Sexe
  ) => {
    Axios.post("http://localhost:3001/Add_condidat", {
      numeroCandidat,
      Nom: Nom,
      Prénom: Prenom,
      Date_naissance: Date_naissance,
      Lieu_naissance: Lieu,
      Niveau: Niveau,
      Adresse: Adresse,
      Prénom_Pére: PrenomPere,
      Sexe: Sexe,
    }).then(() => {
      setEtat(!etat);
    });
  };
  const updateCandidat = (
    numeroCandidat,
    Nom,
    Prenom,
    Date_naissance,
    Lieu,
    Niveau,
    Adresse,
    PrenomPere,
    Sexe
  ) => {
    Axios.put("http://localhost:3001/update_candidat", {
      numeroCandidat: numeroCandidat,
      Nom: Nom,
      Prénom: Prenom,
      Date_naissance: Date_naissance,
      Lieu_naissance: Lieu,
      Niveau: Niveau,
      Adresse: Adresse,
      Prénom_Pére: PrenomPere,
      Sexe: Sexe,
    }).then(() => {
      setEtat(!etat);
    });
  };

  const deleteCandidat = (numeroCandidat) => {
    Axios.delete(
      `http://localhost:3001/delete_candidat/${numeroCandidat}`,
      {}
    ).then(() => {
      setEtat(!etat);
      alert("supprimer");
    });
  };

  const filter = {
    type: "CheckBox",
  };

  const classes = useStyles();

  const TableRef = useRef(null);

  const initialvalues = {
    NUMERO_CANDIDAT: 0,
    NOM_CANDIDAT: "",
    PRENOM_CANDIDAT: "",
    DATE_NAIS_CANDIDAT: new Date(),
    LIEU_NAIS_CANDIDAT: "",
    NIVEAU_SCOL_CANDIDAT: "",
    ADRESSE_CANDIDAT: "",
    PRENOM_PERE: "",
    SEX_CONDIDAT: "",
  };

  function rowSelected() {
    try {
      const selectedrecords = TableRef.current.getSelectedRecords();
      const obj = JSON.stringify(selectedrecords);
      const parsedobj = JSON.parse(obj);
      return parsedobj[0];
    } catch (error) {
      console.log(error);
    }
  }
  const Values = rowSelected();

  function convert() {
    let current_datetime = new Date(Values.DATE_NAIS_CANDIDAT);
    let formatted_date =
      current_datetime.getFullYear() +
      "-" +
      (current_datetime.getMonth() + 1) +
      "-" +
      current_datetime.getDate();
    return formatted_date;
  }

  return (
    <>
    <PageHeader title="Candidat" subTitle="La liste des Candidat"/>
      <div className={classes.container}>
        <Button
          text="Ajouter"
          variant="outlined"
          size="small"
          startIcon={<AddIcon />}
          className={classes.newButton}
          onClick={() => {
            setOpenAjouter(true);
          }}
        />
        <Button
          text="Modifier"
          variant="outlined"
          size="small"
          startIcon={<EditOutlinedIcon />}
          className={classes.newButton}
          onClick={() => {
            if (Values !== undefined) {
              setOpenModifier(true);
            } else {
              alert("Merci de choisir un candidat");
            }
          }}
        />
        <Button
          text="Supprimer"
          variant="outlined"
          size="small"
          color ="secondary"
          startIcon={<DeleteIcon />}
          className={classes.newButton}
          onClick={() => {
            if (Values !== undefined) {
              deleteCandidat(Values.NUMERO_CANDIDAT);
            } else {
              alert("Merci de choisir un candidat");
            }
          }}
        />
      </div>
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <GridComponent
            dataSource={data}
            allowPaging={true}
            pageSettings={{ pageSize: 10 }}
            allowFiltering={true}
            allowGrouping={true}
            filterSettings={filter}
            allowResizing={true}
            allowSorting={true}
            height={180}
            ref={TableRef}
          >
            <ColumnsDirective>
              <ColumnDirective field="NOM_CANDIDAT" headerText="Nom" />
              <ColumnDirective
                field="PRENOM_CANDIDAT"
                headerText="Prénom"
                clipMode="EllipsisWithTooltip"
              />
              <ColumnDirective
                field="PRENOM_PERE"
                headerText="Prénom Père"
                clipMode="EllipsisWithTooltip"
              />
              <ColumnDirective
                field="DATE_NAIS_CANDIDAT"
                headerText="Date de naissance"
                type="date"
                format="dd/MM/yyyy"
                clipMode="EllipsisWithTooltip"
                allowFiltering={false}
              />
              <ColumnDirective
                field="LIEU_NAIS_CANDIDAT"
                headerText="Lieu de naissance"
                clipMode="EllipsisWithTooltip"
              />
              <ColumnDirective
                field="NIVEAU_SCOL_CANDIDAT"
                headerText="Niveau Scolaire"
                clipMode="EllipsisWithTooltip"
              />
              <ColumnDirective
                field="ADRESSE_CANDIDAT"
                headerText="Adresse"
                clipMode="EllipsisWithTooltip"
              />
              <ColumnDirective
                field="SEX_CONDIDAT"
                headerText="Sexe"
                clipMode="EllipsisWithTooltip"
              />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Group, Resize]} />
          </GridComponent>
        </Paper>
      </div>

      <Popup
        title="Ajouter"
        openPopup={openAjouter}
        setOpenPopup={setOpenAjouter}
      >
        <Candidat
          onClick={addCondidat}
          Close={setOpenAjouter}
          values={initialvalues}
        />
      </Popup>

      <Popup
        title="Modéfier"
        openPopup={openModifier}
        setOpenPopup={setOpenModifier}
      >
        <Candidat
          onClick={updateCandidat}
          Close={setOpenModifier}
          values={Values}
        />
      </Popup>
    </>
  );
}
