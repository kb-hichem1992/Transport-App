import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Candidat.css";
import Candidat from "./CandidatForm.js";
import { Paper } from "@material-ui/core";
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
import { setDate } from "date-fns";

require("es6-promise").polyfill();
require("isomorphic-fetch");

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
    justifyContent: "space-between",
  },
}));

export default function AppCand({ id }) {
  const [data, setdata] = useState([]);

  const [selectedDate, setSelectedDate] = useState("");
  const [numeroCandidat, setnumeroCandidat] = useState("");
  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [PrenomPere, setPrenomPere] = useState("");
  const [Lieu, setLieu] = useState("");
  const [Niveau, setNiveau] = useState("");
  const [Adresse, setAdresse] = useState("");
  const [Sexe, setSexe] = useState("");

  useEffect(() => {
    fetch(id)
      .then((response) => response.json())
      .then((json) => setdata(json));
  }, [id,data]);

  const addCondidat = (
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
      Nom: Nom,
      Prénom: Prenom,
      Date_naissance: Date_naissance,
      Lieu_naissance: Lieu,
      Niveau: Niveau,
      Adresse: Adresse,
      Prénom_Pére: PrenomPere,
      Sexe: Sexe,
    }).then( ()=> {
      setdata([
        ...data, 
        {
          Nom: Nom,
          Prénom: Prenom,
          Date_naissance: Date_naissance,
          Lieu_naissance: Lieu,
          Niveau: Niveau,
          Adresse: Adresse,
          Prénom_Pére: PrenomPere,
          Sexe: Sexe,
        },
      ]);
    });
  };
    const test =   (name) =>{
        alert("HEllo"+name)
    };
  const filter = {
    type: "CheckBox",
  };

  const classes = useStyles();

  const TableRef = useRef(null);

  function rowSelected() {
    try {
      const selectedrecords = TableRef.current.getSelectedRecords();
      const obj = JSON.stringify(selectedrecords);
      const parsedobj = JSON.parse(obj);
      console.log(parsedobj[0].NOM_CANDIDAT);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Paper>
        <Candidat Add={addCondidat} />
      </Paper>
      <div className={classes.container}>
        <Paper>
          <div id="cont">
            <GridComponent
              dataSource={data}
              allowPaging={true}
              pageSettings={{ pageSize: 10 }}
              allowFiltering={true}
              allowGrouping={true}
              filterSettings={filter}
              allowResizing={true}
              allowSorting={true}
              height={330}
              ref={TableRef}
              rowSelected={rowSelected}
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
          </div>
        </Paper>
      </div>
    </>
  );
}
