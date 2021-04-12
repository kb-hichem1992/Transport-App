import React from "react";
import "./TableFor.css";
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
export default function TableFor({ data }) {
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
          <ColumnDirective field="NUMERO_FORMATION" headerText="N° Formation" />
          <ColumnDirective
            field="TYPE_FORMATION"
            headerText="Type Formation"
          />
          <ColumnDirective
            field="DEBUT"
            headerText="Date début"
            type ='date'
            format = 'dd/MM/yyyy'
            clipMode="EllipsisWithTooltip"
            allowFiltering={false}
          />
          <ColumnDirective
            field="FIN"
            headerText="Date Fin"
            type ='date'
            format = 'dd/MM/yyyy'
            clipMode="EllipsisWithTooltip"
            allowFiltering={false}
          />
        </ColumnsDirective>
        <Inject services={[Page, Sort, Filter, Group, Resize]} />
      </GridComponent>
    </div>
  );
}
