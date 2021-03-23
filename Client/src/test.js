import React from "react";
import "./test.css";
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

export default function Table({ data }) {
  const filter = {
    type: 'Excel',
  };
  return (
    <div id= "cont">
      <GridComponent
        dataSource={data}
        allowPaging={true}
        pageSettings={{ pageSize: 100 }}
        allowFiltering={true}
        allowGrouping={true}
        filterSettings={filter}
        allowResizing={true}
        allowSorting={true}
        height={300} 
      >
        <ColumnsDirective>
          <ColumnDirective field="Date_doc" headerText="Date Document" width ='165' filter ={{type : "menu"}}/>
          <ColumnDirective field="Date_seq" headerText="Date séquence" width ='165' />
          <ColumnDirective field="Ref_MO" headerText="Référecnce MO" clipMode='EllipsisWithTooltip' width ='160' />
          <ColumnDirective field="Titre" headerText="Objet du document" clipMode='EllipsisWithTooltip'  width ='300' />
          <ColumnDirective field="code" headerText="Codification" width ='290' />
        </ColumnsDirective>
        <Inject services={[Page, Sort, Filter, Group, Resize]} />
      </GridComponent>
    </div>
  );
}
