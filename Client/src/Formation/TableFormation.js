import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { makeStyles, TextField } from "@material-ui/core";
import Button from "../components/controls/Button";
import axios from "axios";
import { L10n } from "@syncfusion/ej2-base";
import AlertDialog from "../components/controls/Dialog";
import { UserContext } from "../UserContext";

export default function TableFormation(props) {
  const [data, setdata] = useState([]);
  const [passdata, setpassdata] = useState([]);
  const { NUM_INS, DATE_INS, NUM_PERMIS } = props.valeur;
  const [groupe, setGroupe] = useState("");
  const [open, setOpen] = useState(false);
  const { userData } = useContext(UserContext);

  const numeroAgrement = userData[0].NUMERO_AGREMENT;

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
  function convert(date) {
    const current_datetime = new Date(date);

    const m = current_datetime.getMonth() + 1;
    if (m > 9) {
      return (
        current_datetime.getFullYear() +
        "-" +
        m +
        "-" +
        current_datetime.getDate()
      );
    } else {
      return (
        current_datetime.getFullYear() +
        "-" +
        0 +
        m +
        "-" +
        current_datetime.getDate()
      );
    }
  }

  useEffect(() => {
    fetch("http://localhost:3001/api/get_form")
      .then((response) => response.json())
      .then((json) => setdata(json));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/api/get_passe")
      .then((response) => response.json())
      .then((json) => setpassdata(json));
  }, []);

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

  const values = rowSelected();

  const handleGroupeChange = (e) => {
    setGroupe(e.target.value);
  };

  const AffecteFormation = (
    numeroCandidat,
    Date_ins,
    Num_permis,
    numeroFormation,
    numeroAgrement,
    groupe
  ) => {
    axios
      .post("http://localhost:3001/Add_passe", {
        numeroCandidat: numeroCandidat,
        Date_ins: Date_ins,
        Num_permis: Num_permis,
        numeroFormation: numeroFormation,
        numeroAgrement: numeroAgrement,
        groupe: groupe,
      })
      .then(() => {
        alert("تمت العملية بنجاح");
        props.Close(false);
      });
  };

  function dejaInscrit(
    Num_permis,
    numeroCandidat,
    Date_ins,
    numeroFormation,
    numeroAgrement
  ) {
    return passdata.some(function (el) {
      if (
        el.NUM_PERMIS === Num_permis &&
        el.NUM_INS === numeroCandidat &&
        convert(el.DATE_INS) === convert(Date_ins) &&
        el.NUMERO_FORMATION === numeroFormation &&
        el.NUMERO_AGREMENT === numeroAgrement
      ) {
        return true;
      } else {
        return false;
      }
    });
  }

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
          pageSettings={{ pageSize: 5 }}
          allowFiltering={true}
          allowGrouping={true}
          filterSettings={filter}
          allowResizing={true}
          allowSorting={true}
          height={100}
          ref={TableRef}
          enableRtl={true}
          locale="ar-AE"
        >
          <ColumnsDirective>
            <ColumnDirective field="NUMERO_FORMATION" headerText="رقم الدورة" />
            <ColumnDirective field="TYPE_FORMATION" headerText="نوع التكوين" />
            <ColumnDirective
              field="DEBUT"
              headerText="تاريخ البداية"
              type="date"
              format="dd/MM/yyyy"
              clipMode="EllipsisWithTooltip"
              allowFiltering={false}
            />
            <ColumnDirective
              field="FIN"
              headerText="تاريخ النهاية"
              type="date"
              format="dd/MM/yyyy"
              clipMode="EllipsisWithTooltip"
              allowFiltering={false}
            />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Group, Resize]} />
        </GridComponent>
        <div className={classes.container}>
          <TextField
            variant="outlined"
            label="الفوج"
            size="small"
            type="number"
            inputProps={{ min: 1, max: 10 }}
            value={groupe}
            onChange={handleGroupeChange}
          />
          <Button
            text="تسجيل"
            variant="outlined"
            size="small"
            className={classes.newButton}
            disabled={values === undefined ? true : false}
            onClick={() => {
              if (groupe === "") {
                alert("يرجى إختيار الفوج");
              } else if (
                dejaInscrit(
                  NUM_PERMIS,
                  NUM_INS,
                  DATE_INS,
                  values.NUMERO_FORMATION,
                  numeroAgrement
                ) === true
              ) {
                alert("مسجل من قبل");
              } else {
                setOpen(true);
              }
            }}
          />
        </div>
      </div>

      <AlertDialog
        title="تأكيد"
        message="هل أنت متأكد من القيام بهذه العملية ؟"
        open={open}
        setOpen={setOpen}
        method={() => {
          AffecteFormation(
            NUM_INS,
            convert(DATE_INS),
            NUM_PERMIS,
            values.NUMERO_FORMATION,
            numeroAgrement,
            groupe
          );
          setOpen(false);
          props.Close(false);
        }}
      />
    </Fragment>
  );
}
