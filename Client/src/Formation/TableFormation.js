import React, { useEffect, useRef, useState } from "react";
import "./Formation.css";
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
import { makeStyles } from "@material-ui/core";
import Button from "../components/controls/Button";
import axios from "axios";


export default function TableFormation(props) {
  const [data, setdata] = useState([]);
  const [numeroFormation, setNumeroFormation] = useState();
  const {NUMERO_CANDIDAT}=props.valeur;


  const useStyles = makeStyles((theme) => ({
    container: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      display: "flex",
      justifyContent: "flex-end",
    },
  }));

  const TableRef = useRef(null);
  
  const classes = useStyles();

  const filter = {
    type: "CheckBox",
  };

  useEffect(() => {
    fetch("http://localhost:3001/api/get_form")
      .then((response) => response.json())
      .then((json) => setdata(json));
  }, [data]);

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

  const values= rowSelected();

  const AffecteFormation = (
    numeroCandidat,
    numeroFormation,
    remarque,
    note
  ) => {
    axios.post("http://localhost:3001/Add_passe", {
      numeroCandidat : numeroCandidat,
      numeroFormation : numeroFormation,
      remarque: remarque,
      note: note,
    }).then(() => {
      alert("Formation affecter")
      props.Close(false);
    });
  };

  return (
    <>
      <div id="cont">
        <GridComponent
          dataSource={data}
          allowPaging={true}
          pageSettings={{ pageSize: 5 }}
          allowFiltering={true}
          allowGrouping={true}
          filterSettings={filter}
          allowResizing={true}
          allowSorting={true}
          height={100}
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
        <div className={classes.container}>
          <Button
            text="Affecter"
            variant="outlined"
            size="small"
            className={classes.newButton}
            onClick={() => {
              if (values !== undefined) {
              AffecteFormation(NUMERO_CANDIDAT,values.NUMERO_FORMATION)
              } else {
                alert("Merci de choisir une formation");
                alert(values)
              }
            }}
          />
        </div>
      </div>
    </>
  );
}
