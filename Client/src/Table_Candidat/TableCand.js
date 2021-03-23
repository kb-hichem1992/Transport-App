import React from "react";
import "./TableCand.css";
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
export default function TableCand({ data }) {
  const filter = {
    type: "CheckBox",
  };
  return (
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
        </ColumnsDirective>
        <Inject services={[Page, Sort, Filter, Group, Resize]} />
      </GridComponent>
    </div>
  );
}
