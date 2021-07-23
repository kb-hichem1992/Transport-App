import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  useContext,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Candidat.css";
import Candidat from "./CandidatForm.js";
import TableFormation from "../Formation/TableFormation.js";
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
  PdfExport,
} from "@syncfusion/ej2-react-grids";

import { L10n } from "@syncfusion/ej2-base";
import Axios from "axios";
import Popup from "../components/Popup.js";
import Button from "../components/controls/Button";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import PageHeader from "../PageHeader";
import CandidatInfo from "./CandidatInfo";
import GroupIcon from "@material-ui/icons/Group";
import { UserContext } from "../UserContext";
import AlertDialog from "../components/controls/Dialog";
import PrintIcon from "@material-ui/icons/Print";
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
      Excelexport: "تصدير Excel",
      Copy: "نسخ",
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

export default function AppCand({ id }) {
  const [data, setdata] = useState([]);
  const [openAjouter, setOpenAjouter] = useState(false);
  const [openModifier, setOpenModifier] = useState(false);
  const [openFormation, setOpenFormation] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [etat, setEtat] = useState(false);
  const [open, setOpen] = useState(false);

  const { userData } = useContext(UserContext);
  useEffect(() => {
    fetch(id)
      .then((response) => response.json())
      .then((json) => setdata(json));
  }, [id, data, etat]);

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

  const addCondidat = (
    numeroCandidat,
    Date_ins,
    Nom,
    Prénom,
    Date_naissance,
    Lieu_naissance,
    Niveau,
    Adresse,
    Prénom_Pére,
    Sexe,
    Type_Candidat,
    Num_permis,
    date_liv,
    date_exp,
    categorie_permis,
    type_permis
  ) => {
    Axios.post("http://localhost:3001/Add_condidat", {
      numeroCandidat: numeroCandidat,
      Date_ins: Date_ins,
      Nom: Nom,
      Prénom: Prénom,
      Date_naissance: Date_naissance,
      Lieu_naissance: Lieu_naissance,
      Niveau: Niveau,
      Adresse: Adresse,
      Prénom_Pére: Prénom_Pére,
      Sexe: Sexe,
      Type_Candidat: Type_Candidat,
      Num_permis: Num_permis,
      date_liv: date_liv,
      date_exp: date_exp,
      categorie_permis: categorie_permis,
      type_permis: type_permis,
    }).then(() => {
      setEtat(!etat);
    });
  };
  const updateCandidat = (
    numeroCandidat,
    Date_ins,
    Nom,
    Prénom,
    Date_naissance,
    Lieu_naissance,
    Niveau,
    Adresse,
    Prénom_Pére,
    Sexe,
    Type_Candidat,
    Num_permis,
    date_liv,
    date_exp,
    categorie_permis,
    type_permis
  ) => {
    Axios.put("http://localhost:3001/update_candidat", {
      Nom: Nom,
      Prénom: Prénom,
      Date_naissance: Date_naissance,
      Lieu_naissance: Lieu_naissance,
      Niveau: Niveau,
      Adresse: Adresse,
      Prénom_Pére: Prénom_Pére,
      Sexe: Sexe,
      Type_Candidat: Type_Candidat,
      date_liv: date_liv,
      date_exp: date_exp,
      categorie_permis: categorie_permis,
      type_permis: type_permis,
      Num_permis: Num_permis,
      Date_ins: Date_ins,
      numeroCandidat: numeroCandidat,
    }).then(() => {
      setEtat(!etat);
    });
  };

  const deleteCandidat = (Num_permis, Date_ins, numeroCandidat) => {
    Axios.post(`http://localhost:3001/delete_candidat`, {
      Num_permis: Num_permis,
      Date_ins: Date_ins,
      numeroCandidat: numeroCandidat,
    }).then(() => {
      setEtat(!etat);
    });
  };

  const filter = {
    type: "CheckBox",
  };

  const classes = useStyles();

  const TableRef2 = useRef(null);

  const initialvalues = {
    NUM_INS: "",
    DATE_INS: new Date(),
    NOM_CANDIDAT: "",
    PRENOM_CANDIDAT: "",
    DATE_NAIS_CANDIDAT: new Date(),
    LIEU_NAIS_CANDIDAT: "",
    NIVEAU_SCOL_CANDIDAT: "",
    ADRESSE_CANDIDAT: "",
    PRENOM_PERE: "",
    SEX_CONDIDAT: "",
    TYPE_CANDIDAT: "",
    NUM_PERMIS: "",
    DATE_LIV_PERMIS: new Date(),
    DATE_EXP_PERMIS: new Date(),
    CATEGORIE_PERMIS: "",
    TYPE_PERMIS: "القديم",
  };

  function rowSelected() {
    try {
      const selectedrecords = TableRef2.current.getSelectedRecords();
      const obj = JSON.stringify(selectedrecords);
      const parsedobj = JSON.parse(obj);
      return parsedobj[0];
    } catch (error) {}
  }
  const Values = rowSelected();
  const contextMenuItems = ["Copy", "ExcelExport"];

  const ContextMenuItemModel = [
    { text: "معلومات إضافية", target: ".e-content", id: "Details" },
    { text: "شهادة التسجيل", target: ".e-content", id: "fiche" },
  ];

  const contextMenuClick = (MenuEventArgs) => {
    if (
      TableRef2 &&
      MenuEventArgs.item.id === "Details" &&
      Values !== undefined
    ) {
      setOpenDetail(true);
    }
  };

  return (
    <Fragment>
      <PageHeader
        title="المترشحين"
        subTitle="قائمة المترشحين"
        icon={<GroupIcon />}
      />
      <div className={classes.div}>
        <div className={classes.container}>
          <Button
            text="إضافة"
            variant="outlined"
            size="small"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenAjouter(true);
            }}
          />
          <Button
            text="تعديل"
            variant="outlined"
            size="small"
            startIcon={<EditOutlinedIcon />}
            className={classes.newButton}
            disabled={
              Values === undefined || userData[0].ADMIN !== "admin"
                ? true
                : false
            }
            onClick={() => {
              setOpenModifier(true);
            }}
          />
          <Button
            text="حذف"
            variant="outlined"
            size="small"
            color="secondary"
            startIcon={<DeleteIcon />}
            className={classes.newButton}
            disabled={
              Values === undefined || userData[0].ADMIN !== "admin"
                ? true
                : false
            }
            onClick={() => {
              setOpen(true);
            }}
          />
        </div>
        <div>
          <form
            action={
              Values !== undefined
                ? "http://localhost:3001/report/EVALUATION/"+Values.NUM_INS+"/"+ Values.NUM_PERMIS +"/"+Values.DATE_INS +"/"+userData[0].NUMERO_AGREMENT+""
                : "error"
            }
            method="get"
            target="_blank"
          >
            {/* <Button
              text="تكوين"
              variant="outlined"
              size="small"
              startIcon={<AddIcon />}
              className={classes.newButton}
              disabled={Values === undefined ? true : false}
              onClick={() => {
                setOpenFormation(true);
              }}
            /> */}

            <Button
              type="submit"
              text="شهادة التسجيل"
              variant="outlined"
              size="small"
              startIcon={<PrintIcon />}
              className={classes.newButton}
              disabled={
                Values === undefined || userData[0].ADMIN !== "admin"
                  ? true
                  : false
              }
            />
          </form>
        </div>
      </div>
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <GridComponent
            dataSource={data}
            enableRtl={true}
            allowPaging={true}
            pageSettings={{ pageSize: 100 }}
            allowFiltering={true}
            allowGrouping={true}
            filterSettings={filter}
            allowResizing={true}
            allowSorting={true}
            height={180}
            ref={TableRef2}
            contextMenuItems={[...ContextMenuItemModel, ...contextMenuItems]}
            contextMenuClick={contextMenuClick}
            allowExcelExport={true}
            allowPdfExport={true}
            locale="ar-AE"
          >
            <ColumnsDirective>
              <ColumnDirective
                field="NUM_PERMIS"
                headerText="رقم رخسة السياقة"
                clipMode="EllipsisWithTooltip"
              />
              <ColumnDirective
                field="NOM_CANDIDAT"
                headerText="اللقب"
                clipMode="EllipsisWithTooltip"
              />

              <ColumnDirective
                field="PRENOM_CANDIDAT"
                headerText="الاسم"
                clipMode="EllipsisWithTooltip"
              />
              <ColumnDirective
                field="PRENOM_PERE"
                headerText="إسم الأب"
                clipMode="EllipsisWithTooltip"
              />
              <ColumnDirective
                field="DATE_NAIS_CANDIDAT"
                headerText="تاريخ الميلاد"
                type="date"
                format="dd/MM/yyyy"
                clipMode="EllipsisWithTooltip"
                allowFiltering={false}
              />
              <ColumnDirective
                field="LIEU_NAIS_CANDIDAT"
                headerText="مكان الميلاد"
                clipMode="EllipsisWithTooltip"
              />
              <ColumnDirective
                field="TYPE_CANDIDAT"
                headerText="نوع المترشح"
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
                PdfExport,
                ExcelExport,
              ]}
            />
          </GridComponent>
        </Paper>
      </div>

      <Popup
        title="إضافة المترشح"
        openPopup={openAjouter}
        setOpenPopup={setOpenAjouter}
      >
        <Candidat
          key="Ajouter"
          setOpenWindows={setOpenAjouter}
          onClick={addCondidat}
          Close={setOpenAjouter}
          values={initialvalues}
          data={data}
        />
      </Popup>

      <Popup
        title="تعديل البيانات"
        openPopup={openModifier}
        setOpenPopup={setOpenModifier}
      >
        <Candidat
          setOpenWindows={setOpenModifier}
          onClick={updateCandidat}
          Close={setOpenModifier}
          values={Values}
          data={data}
        />
      </Popup>
      <Popup
        title="تحديد التكوين"
        openPopup={openFormation}
        setOpenPopup={setOpenFormation}
      >
        <TableFormation
          key="TableFormation"
          Close={setOpenFormation}
          rowSelected={rowSelected}
          valeur={Values}
        />
      </Popup>
      <Popup
        title="بيانات المترشح"
        openPopup={openDetail}
        setOpenPopup={setOpenDetail}
      >
        <CandidatInfo
          key="CandidatInfo"
          Close={setOpenDetail}
          rowSelected={rowSelected}
          values={Values}
        />
      </Popup>

      <AlertDialog
        title="تحذير"
        message="قيامك بهذه العملية سيحذف كل مايتعلق بهاذاالمترشح. هل انت متأكد ؟"
        open={open}
        setOpen={setOpen}
        method={() => {
          deleteCandidat(
            Values.NUM_PERMIS,
            convert(Values.DATE_INS),
            Values.NUM_INS
          );
        }}
      />
    </Fragment>
  );
}
