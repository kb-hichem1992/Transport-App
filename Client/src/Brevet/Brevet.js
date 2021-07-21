import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  useContext,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
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
  ContextMenu,
  ExcelExport,
} from "@syncfusion/ej2-react-grids";
import Popup from "../components/Popup.js";
import Button from "../components/controls/Button";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import PageHeader from "../PageHeader";
import BrevetForm from "../Formation/BrevetForm.js";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import axios from "axios";
import { L10n } from "@syncfusion/ej2-base";
import { UserContext } from "../UserContext.js";
import PrintIcon from "@material-ui/icons/Print";

require("es6-promise").polyfill();
require("isomorphic-fetch");

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiButton-text": {
      fontSize: "100px",
    },
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
    Date_ins,
    Num_permis,
    numeroFormation,
    numeroAgrement,
    GROUPE
  ) => {
    axios
      .put("http://localhost:3001/insert_brevet", {
        NumeroBrevet: NumeroBrevet,
        LivBrevet: LivBrevet,
        ExpBrevet: ExpBrevet,
        numeroCandidat: numeroCandidat,
        Date_ins: Date_ins,
        Num_permis: Num_permis,
        numeroFormation: numeroFormation,
        numeroAgrement: numeroAgrement,
        GROUPE: GROUPE,
      })
      .then(() => {
        setEtat(!etat);
      });
  };
  const contextMenuItems = ["Copy", "ExcelExport"];

  const getPDF = (
    numeroCandidat,
    numeroFormation,
    Num_permis,
    dateins,
    numeroAgrement
  ) => {
    const viewHandler = async () => {
      const apiURL = `http://localhost:3001/report/DIPLOME/${numeroCandidat}/${numeroFormation}/${Num_permis}/${dateins}/${numeroAgrement}`;
      axios(apiURL, {
        method: "GET",
        responseType: "blob", //Force to receive data in a Blob Format
      })
        .then((response) => {
          //Create a Blob from the PDF Stream
          const file = new Blob([response.data], { type: "application/pdf" });
          console.log(response.data);
          //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
          //Open the URL on new Window
          window.open(fileURL);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    viewHandler();
  };

function imprimer(
    numeroCandidat,
    numeroFormation,
    Num_permis,
    dateins,
    numeroAgrement
  ) {
   axios.get(
      `http://localhost:3001/report/DIPLOME/${numeroCandidat}/${numeroFormation}/${Num_permis}/${dateins}/${numeroAgrement}`
    ).then ( response => {
      console.log(response.data);
    }).catch(err => {
       alert(err)
    })
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
  const { userData } = useContext(UserContext);

  return (
    <Fragment>
      <PageHeader
        title="الشهادات"
        subTitle="قائمة الشهادات المستخرجة"
        icon={<LibraryBooksIcon />}
      />

      <div className={classes.container}>
        <Button
          text="طباعة"
          variant="outlined"
          size="small"
          startIcon={<PrintIcon />}
          className={classes.newButton}
          disabled={
            Values === undefined || userData[0].ADMIN !== "admin" ? true : false
          }
          onClick={() => {
            imprimer(
              Values.NUM_INS,
              Values.NUMERO_FORMATION,
              Values.NUM_PERMIS,
              Values.DATE_INS,
              Values.NUMERO_AGREMENT
            );
            // let a = document.createElement("a");
            // a.href = response; // pdf encode
            // a.download = "test4.pdf";
            // a.click();
          }}
        />
      </div>
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <GridComponent
            dataSource={data}
            allowPaging={true}
            pageSettings={{ pageSize: 100 }}
            allowFiltering={true}
            allowGrouping={true}
            filterSettings={filter}
            allowResizing={true}
            allowSorting={true}
            height={180}
            ref={TableRef2}
            enableRtl={true}
            locale="ar-AE"
            contextMenuItems={contextMenuItems}
            allowExcelExport={true}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="BREVET"
                headerText="رقم الشهادة"
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
                field="PRENOM_PERE"
                headerText="إسم الأب"
                clipMode="EllipsisWithTooltip"
              />
              <ColumnDirective
                field="LIV_BREVET"
                headerText="تاريخ الإصدار"
                type="date"
                format="dd/MM/yyyy"
                clipMode="EllipsisWithTooltip"
                allowFiltering={false}
              />
              <ColumnDirective
                field="EXP_BREVET"
                headerText="تاريخ نهاية الصلاحية"
                type="date"
                format="dd/MM/yyyy"
                clipMode="EllipsisWithTooltip"
                allowFiltering={false}
              />
              <ColumnDirective
                field="TYPE_FORMATION"
                headerText="نوع الدورة"
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
        </Paper>
      </div>
      <Popup
        title="تعديل"
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
    </Fragment>
  );
}
