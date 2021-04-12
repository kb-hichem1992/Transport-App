import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Formation.css";
import Form from "./FormationForm.js";
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
import Popup from "../components/Popup";
import Button from "../components/controls/Button";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import PageHeader from "../PageHeader.js";
require("es6-promise").polyfill();
require("isomorphic-fetch");

function AppFor({ id }) {
  const [data, setdata] = useState([]);
  const [openAjouter, setOpenAjouter] = useState(false);
  const [openModifier, setOpenModifier] = useState(false);
  const [etat, setEtat] = useState(false);

  useEffect(() => {
    fetch(id)
      .then((response) => response.json())
      .then((json) => setdata(json));
  }, [id, data, etat]);
  const useStyles = makeStyles((theme) => ({
    root: {
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    formControl: {
      display: "inline-flex",
      margin: theme.spacing(2),
      minWidth: 170,
    },
    container: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      display: "flex",
      justifyContent: "flex-end",
    },
  }));
  const addFormation = (
    numeroFormation,
    Type,
    Debut,
    Fin
  ) => {
    axios.post("http://localhost:3001/Add_formation", {
      numeroFormation,
      Type: Type,
      Debut: Debut,
      Fin: Fin,
    }).then(() => {
      setEtat(!etat);
    });
  };

  const deleteFormation = (numeroFormation) => {
    axios.delete(
      `http://localhost:3001/delete_formation/${numeroFormation}`,
      {}
    ).then(() => {
      setEtat(!etat);
      alert("supprimer");
    });
  };

  const classes = useStyles();

  const filter = {
    type: "CheckBox",
  };
  const initialvalues = {
    NUMERO_FORMATION: 0,
    TYPE_FORMATION: "",
    DEBUT: new Date(),
    FIN: new Date(),
  };
  const TableRef = useRef(null);

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

  return (
    <>
    <PageHeader title="Formation" subTitle="La liste des formation"/>
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
              deleteFormation(Values.NUMERO_FORMATION);
            } else {
              alert("Merci de choisir un candidat");
            }
          }}
        />
      </div>
      <div className={classes.container}>
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
            height={180}
            ref={TableRef}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="NUMERO_FORMATION"
                headerText="N° Formation"
              />
              <ColumnDirective
                field="TYPE_FORMATION"
                headerText="Type Formation"
              />
              <ColumnDirective
                field="DEBUT"
                headerText="Date début"
                type="date"
                format="dd/MM/yyyy"
                clipMode="EllipsisWithTooltip"
                allowFiltering={false}
              />
              <ColumnDirective
                field="FIN"
                headerText="Date Fin"
                type="date"
                format="dd/MM/yyyy"
                clipMode="EllipsisWithTooltip"
                allowFiltering={false}
              />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Group, Resize]} />
          </GridComponent>
        </div>
      </div>

      <Popup
        title="Ajouter"
        openPopup={openAjouter}
        setOpenPopup={setOpenAjouter}
      >
        <Form
          onClick={addFormation}
          Close={setOpenAjouter}
          values={initialvalues}
        />
      </Popup>

      <Popup
        title="Modéfier"
        openPopup={openModifier}
        setOpenPopup={setOpenModifier}
      >
        <Form
          //    onClick={updateCandidat}
          Close={setOpenModifier}
          values={Values}
        />
      </Popup>
    </>
  );
}
export default AppFor;
