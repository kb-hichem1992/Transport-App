import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../Candidat/Candidat.css";
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
import { L10n } from "@syncfusion/ej2-base";
import { UserContext } from "../UserContext";

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

export default function SearchTable() {
  const [data, setdata] = useState([]);

  const { userData } = useContext(UserContext);
  const numeroAgrement = userData[0].NUMERO_AGREMENT;

  useEffect(() => {
    fetch(`http://localhost:3001/api/Passing_List/${numeroAgrement}`)
      .then((response) => response.json())
      .then((json) => setdata(json));
  }, [numeroAgrement]);

  const filter = {
    type: "CheckBox",
  };

  const TableRef3 = useRef(null);

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
      <div id="cont">
        <GridComponent
          dataSource={data}
          allowPaging={true}
          pageSettings={{ pageSize: 100 }}
          allowFiltering={true}
          allowGrouping={true}
          filterSettings={filter}
          allowResizing={true}
          allowSorting={true}
          height={200}
          ref={TableRef3}
          enableRtl={true}
          locale="ar-AE"
        >
          <ColumnsDirective>
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
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Group, Resize]} />
        </GridComponent>
      </div>
    </Fragment>
  );
}
