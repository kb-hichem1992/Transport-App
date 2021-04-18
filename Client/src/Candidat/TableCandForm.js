import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Candidat.css";
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
  fltrPrevent,
} from "@syncfusion/ej2-react-grids";
import Button from "../components/controls/Button";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import Popup from "../components/Popup";
import PasseFrom from "../Formation/PasseForm";
import axios from "axios";

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

export default function TableCandForm() {
  const [data, setdata] = useState([]);
  const [openModifier, setOpenModifier] = useState(false);
  const [etat, setEtat] = useState(false);
  const [evaluation, setEvaluation] = useState();
  

  useEffect(() => {
    fetch("http://localhost:3001/api/get_candidat_form")
      .then((response) => response.json())
      .then((json) => setdata(json));
  }, [etat]);

  const filter = {
    type: "Excel",
  };
  const TableRef3 = useRef(null);
  const classes = useStyles();

  const updatePasse = (remarque, note, numeroCandidat, numeroFormation) => {
    axios.put("http://localhost:3001/update_passe", {
        remarque: remarque,
        note: note,
        numeroCandidat: numeroCandidat,
        numeroFormation: numeroFormation,
      })
      .then(() => {
        setEtat(!etat);
      });
  };
  function rowSelected() {
    try {
      const selectedrecords = TableRef3.current.getSelectedRecords();
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
      <div className={classes.container}>
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
              alert("Merci de choisir une formation");
            }
          }}
        />
        <Button
          text="Supprimer"
          variant="outlined"
          size="small"
          color="secondary"
       //   disabled= { Values.NOTE < 10  ? Values.NOTE === undefined  ? true : false }
          startIcon={<DeleteIcon />}
          className={classes.newButton}
          // onClick={() => {
          //   if (Values !== undefined) {
          //     deleteFormation(Values.NUMERO_FORMATION);
          //   } else {
          //     alert("Merci de choisir une formation");
          //   }
          // }}
        />
      </div>
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
          height={200}
          ref={TableRef3}
        
        >
          <ColumnsDirective>
            <ColumnDirective
              field="NUMERO_FORMATION"
              headerText="N° Formation"
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
              field="TYPE_FORMATION"
              headerText="Type formation"
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="DEBUT"
              headerText="Début Formation"
              type="date"
              format="dd/MM/yyyy"
              clipMode="EllipsisWithTooltip"
              allowFiltering={false}
            />
            <ColumnDirective
              field="FIN"
              headerText="Fin Formation"
              type="date"
              format="dd/MM/yyyy"
              clipMode="EllipsisWithTooltip"
              allowFiltering={false}
            />
            <ColumnDirective
              field="REMARQUE"
              headerText="Remarque"
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="NOTE"
              headerText="Note"
              clipMode="EllipsisWithTooltip"
            />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Group, Resize]} />
        </GridComponent>
      </div>
      <Popup
        title="Modéfier"
        openPopup={openModifier}
        setOpenPopup={setOpenModifier}
      >
        <PasseFrom
          onClick={updatePasse}
          Close={setOpenModifier}
          values={Values}
        />
      </Popup>
    </>
  );
}
