import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Candidat.css";
import Candidat from "./CandidatForm.js";
import TableFormation from "../Formation/TableFormation.js";
import { useAuth0 } from "@auth0/auth0-react";
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
import Popup from "../components/Popup.js";
import Button from "../components/controls/Button";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import PageHeader from "../PageHeader";
import CandidatInfo from "./CandidatInfo";
import { ContextMenu } from "@syncfusion/ej2-react-grids";
import GroupIcon from "@material-ui/icons/Group";

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
  div: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function AppCand({ id }) {
  const [data, setdata] = useState([]);
  const [openAjouter, setOpenAjouter] = useState(false);
  const [openModifier, setOpenModifier] = useState(false);
  const [openFormation, setOpenFormation] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [etat, setEtat] = useState(false);
  const { user } = useAuth0();

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
    Sexe,
    Num_permis,
    date_liv,
    date_exp,
    categorie_permis,
    type_permis
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
      Num_permis: Num_permis,
      date_liv: date_liv,
      date_exp: date_exp,
      categorie_permis: categorie_permis,
      type_permis: type_permis,
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
    Sexe,
    Num_permis,
    date_liv,
    date_exp,
    categorie_permis,
    type_permis
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
      Num_permis: Num_permis,
      date_liv: date_liv,
      date_exp: date_exp,
      categorie_permis: categorie_permis,
      type_permis: type_permis,
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

  const TableRef2 = useRef(null);

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
    NUM_PERMIS: "",
    DATE_LIV_PERMIS: new Date(),
    DATE_EXP_PERMIS: new Date(),
    CATEGORIE_PERMIS: "",
    TYPE_PERMIS: "Normal",
  };

  function rowSelected() {
    try {
      const selectedrecords = TableRef2.current.getSelectedRecords();
      const obj = JSON.stringify(selectedrecords);
      const parsedobj = JSON.parse(obj);
      return parsedobj[0];
    } catch (error) {}
  }
  const Values = rowSelected();

  const ContextMenuItemModel = [
    { text: "Affiche Détail", target: ".e-content", id: "Details" },
  ];

  const contextMenuClick = (MenuEventArgs) => {
    if (
      TableRef2 &&
      MenuEventArgs.item.id === "Details" &&
      Values !== undefined
    ) {
      setOpenDetail(true);
    }
  };

  return (
    <>
      <PageHeader
        title="Candidat"
        subTitle="La liste des Candidat"
        icon={<GroupIcon />}
      />
      <div className={classes.div}>
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
            disabled={
              Values === undefined || user.email !== "kb-hichem@hotmail.fr"
                ? true
                : false
            }
            onClick={() => {
              setOpenModifier(true);
            }}
          />
          <Button
            text="Supprimer"
            variant="outlined"
            size="small"
            color="secondary"
            startIcon={<DeleteIcon />}
            className={classes.newButton}
            disabled={
              Values === undefined || user.email !== "kb-hichem@hotmail.fr"
                ? true
                : false
            }
            onClick={() => {
              deleteCandidat(Values.NUMERO_CANDIDAT);
            }}
          />
        </div>
        <div>
          <Button
            text="Formation"
            variant="outlined"
            size="small"
            startIcon={<AddIcon />}
            className={classes.newButton}
            disabled={Values === undefined ? true : false}
            onClick={() => {
              setOpenFormation(true);
            }}
          />
        </div>
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
            ref={TableRef2}
            recordDoubleClick={() => {
              setOpenDetail(true);
            }}
            contextMenuItems={ContextMenuItemModel}
            contextMenuClick={contextMenuClick}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="NUM_PERMIS"
                headerText="N° Permis"
                clipMode="EllipsisWithTooltip"
              />
              <ColumnDirective
                field="NOM_CANDIDAT"
                headerText="Nom"
                clipMode="EllipsisWithTooltip"
              />

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
            </ColumnsDirective>
            <Inject
              services={[Page, Sort, Filter, Group, Resize, ContextMenu]}
            />
          </GridComponent>
        </Paper>
      </div>

      <Popup
        title="Ajouter"
        openPopup={openAjouter}
        setOpenPopup={setOpenAjouter}
      >
        <Candidat
          setOpenWindows={setOpenAjouter}
          onClick={addCondidat}
          Close={setOpenAjouter}
          values={initialvalues}
          data={data}
        />
      </Popup>

      <Popup
        title="Modéfier"
        openPopup={openModifier}
        setOpenPopup={setOpenModifier}
      >
        <Candidat
          setOpenWindows={setOpenModifier}
          onClick={updateCandidat}
          Close={setOpenModifier}
          values={Values}
          data={data}
        />
      </Popup>
      <Popup
        title="Affecter formation"
        openPopup={openFormation}
        setOpenPopup={setOpenFormation}
      >
        <TableFormation
          key="TableFormation"
          Close={setOpenFormation}
          rowSelected={rowSelected}
          valeur={Values}
        />
      </Popup>
      <Popup
        title="Détails"
        openPopup={openDetail}
        setOpenPopup={setOpenDetail}
      >
        <CandidatInfo
          key="CandidatInfo"
          Close={setOpenDetail}
          rowSelected={rowSelected}
          values={Values}
        />
      </Popup>
    </>
  );
}
