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
} from "@syncfusion/ej2-react-grids";
import Button from "../components/controls/Button";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import PrintIcon from "@material-ui/icons/Print";
import Popup from "../components/Popup";
import PasseFrom from "../Formation/PasseForm";
import axios from "axios";
import BrevetForm from "../Formation/BrevetForm";
import { useAuth0 } from "@auth0/auth0-react";

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

export default function TableCandForm({ setEtat, etat, numeroFormation }) {
  const [data, setdata] = useState([]);
  const [openModifier, setOpenModifier] = useState(false);
  const [openImprimer, setOpenImprimer] = useState(false);
  const { user } = useAuth0();

  useEffect(() => {
    fetch(`http://localhost:3001/api/get_candidat_form/${numeroFormation}`)
      .then((response) => response.json())
      .then((json) => setdata(json));
  }, [etat, numeroFormation]);

  const filter = {
    type: "Excel",
  };
  const TableRef3 = useRef(null);
  const classes = useStyles();

  const updatePasse = (
    remarque,
    note,
    groupe,
    numeroCandidat,
    numeroFormation,
    GROUPE
  ) => {
    axios
      .put("http://localhost:3001/update_passe", {
        remarque: remarque,
        note: note,
        groupe: groupe,
        numeroCandidat: numeroCandidat,
        numeroFormation: numeroFormation,
        GROUPE: GROUPE,
      })
      .then(() => {
        setEtat(!etat);
      });
  };

  const insertBrevet = (
    NumeroBrevet,
    LivBrevet,
    ExpBrevet,
    numeroCandidat,
    numeroFormation,
    GROUPE
  ) => {
    axios
      .put("http://localhost:3001/insert_brevet", {
        NumeroBrevet: NumeroBrevet,
        LivBrevet: LivBrevet,
        ExpBrevet: ExpBrevet,
        numeroCandidat: numeroCandidat,
        numeroFormation: numeroFormation,
        GROUPE: GROUPE,
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
          text="Imprimer"
          variant="outlined"
          size="small"
          color="primary"
          disabled={Values === undefined || Values.NOTE < 10  || user.email !== "kb-hichem@hotmail.fr" ? true : false}
          startIcon={<PrintIcon />}
          className={classes.newButton}
          onClick={() => {
            setOpenImprimer(true);
          }}
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
              field="GROUPE"
              headerText="Groupe"
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
      <Popup
        title="Brevet"
        openPopup={openImprimer}
        setOpenPopup={setOpenImprimer}
      >
        <BrevetForm
          onClick={insertBrevet}
          Close={setOpenImprimer}
          values={Values}
          data={data}
        />
      </Popup>
    </>
  );
}
