import React, { Fragment, useEffect, useRef, useState } from "react";

import "../Candidat/Candidat.css";
import {
  GridComponent,
  ColumnDirective,
  ColumnsDirective,
  ContextMenu,
  Page,
  Inject,
  Filter,
  Group,
  Resize,
  Sort,
  ExcelExport,
} from "@syncfusion/ej2-react-grids";
import { L10n } from "@syncfusion/ej2-base";
import PageHeader from "../PageHeader";
import SearchIcon from "@material-ui/icons/Search";
import { useLocalStorage } from "../useLocalStorage";

export default function SearchTable() {
  const [data, setdata] = useState([]);

  const [side] = useLocalStorage("side");
  const [type] = useLocalStorage("typeUser");
  const [numeroAgrement] = useLocalStorage("user", 0);
  const urlAdmin = `${process.env.REACT_APP_API_URL}/api/Passing_List/${numeroAgrement}`;
  const urlAutoEcole = `${process.env.REACT_APP_API_URL}/api/Passing_List/${numeroAgrement}/${type}`;

  useEffect(() => {
    fetch(type === "admin" ? urlAdmin : urlAutoEcole)
      .then((response) => response.json())
      .then((json) => setdata(json));
  }, [urlAdmin, urlAutoEcole]);

  const filter = {
    type: "Menu",
  };

  const TableRef3 = useRef(null);
  const contextMenuItems = ["Copy", "ExcelExport"];

  L10n.load({
    "ar-AE": {
      grid: {
        EmptyDataSourceError:
          "يجب أن يكون مصدر البيانات فارغة في التحميل الأولي منذ يتم إنشاء الأعمدة من مصدر البيانات في أوتوجينيراتد عمود الشبكة",
        EmptyRecord: "لا سجلات لعرضها",
        SelectAll: "أختر الكل",
        FilterButton: "بحث ",
        ClearButton: "مسح ",
        Search: "بحث ",
        GroupDropArea: "اسحب رأس العمود هنا لتجميع العمود الخاص به ",
      },

      pager: {
        currentPageInfo: "{0} من {1} صفحة",
        firstPageTooltip: "انتقل إلى الصفحة الأولى",
        lastPageTooltip: "انتقل إلى الصفحة الأخيرة",
        nextPageTooltip: "انتقل إلى الصفحة التالية",
        nextPagerTooltip: "الذهاب إلى بيجر المقبل",
        previousPageTooltip: "انتقل إلى الصفحة السابقة",
        previousPagerTooltip: "الذهاب إلى بيجر السابقة",
        totalItemsInfo: "({0} العناصر)",
      },
    },
  });
  return (
    <Fragment>
      <PageHeader
        title="قائمة البحث "
        subTitle="قائمة المترشحين الذين إجتازوا أو سجلوا في الدورات"
        icon={<SearchIcon />}
      />

      <div id="cont">
        <GridComponent
          dataSource={data}
          allowPaging={true}
          pageSettings={{ pageSize: 13 }}
          allowFiltering={true}
          allowGrouping={true}
          filterSettings={filter}
          allowResizing={true}
          allowSorting={true}
          height="auto"
          ref={TableRef3}
          enableRtl={true}
          locale="ar-AE"
          contextMenuItems={contextMenuItems}
          allowExcelExport={true}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="NUMERO_AGREMENT"
              headerText="رقم المركز"
              clipMode="EllipsisWithTooltip"
              visible={side === "مركز" ? false : true}
            />
            <ColumnDirective
              field="NUM_INS"
              headerText="رقم التسجيل"
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="NOM_CANDIDAT"
              headerText="اللقب"
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="PRENOM_CANDIDAT"
              headerText="الإسم"
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="DATE_NAIS_CANDIDAT"
              headerText=" تاريخ الميلاد"
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="NUMERO_FORMATION"
              headerText=" رقم الدورة"
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="GROUPE"
              headerText=" الفوج"
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="TYPE_FORMATION"
              headerText=" التخصص"
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="REMARQUE"
              headerText="الملاحظة"
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="NOTE"
              headerText="العلامة"
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective
              field="BREVET"
              headerText="رقم الشهادة"
              clipMode="EllipsisWithTooltip"
            />
          </ColumnsDirective>
          <Inject
            services={[
              Page,
              Sort,
              Filter,
              Group,
              Resize,
              ContextMenu,
              ExcelExport,
            ]}
          />
        </GridComponent>
      </div>
    </Fragment>
  );
}
