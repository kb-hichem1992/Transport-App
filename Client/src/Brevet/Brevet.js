import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import Popup from "../components/Popup.js";
import Button from "../components/controls/Button";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import PageHeader from "../PageHeader";
import { ContextMenu } from "@syncfusion/ej2-react-grids";
import BrevetForm from "../Formation/BrevetForm.js";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import axios from "axios";

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

export default function AppBrevet({ id }) {
  const [data, setdata] = useState([]);
  const [openModifier, setOpenModifier] = useState(false);
  const [etat, setEtat] = useState(false);
  const { user } = useAuth0();
  useEffect(() => {
    fetch(id)
      .then((response) => response.json())
      .then((json) => setdata(json));
  }, [id, data, etat]);

  const filter = {
    type: "CheckBox",
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

  const classes = useStyles();

  const TableRef2 = useRef(null);

  function rowSelected() {
    try {
      const selectedrecords = TableRef2.current.getSelectedRecords();
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
      <PageHeader
        title="Diplômes"
        subTitle="La liste des diplômes"
        icon={<LibraryBooksIcon />}
      />
      <div className={classes.div}>
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
          >
            <ColumnsDirective>
              <ColumnDirective
                field="BREVET"
                headerText="N° Diplôme"
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
                field="LIV_BREVET"
                headerText="Date de livraison"
                type="date"
                format="dd/MM/yyyy"
                clipMode="EllipsisWithTooltip"
                allowFiltering={false}
              />
              <ColumnDirective
                field="EXP_BREVET"
                headerText="Date d'expiration"
                type="date"
                format="dd/MM/yyyy"
                clipMode="EllipsisWithTooltip"
                allowFiltering={false}
              />
              <ColumnDirective
                field="TYPE_FORMATION"
                headerText="Formation"
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
        title="Modéfier"
        openPopup={openModifier}
        setOpenPopup={setOpenModifier}
      >
        <BrevetForm
          onClick={insertBrevet}
          Close={setOpenModifier}
          values={Values}
          data={data}
        />
      </Popup>
    </>
  );
}
