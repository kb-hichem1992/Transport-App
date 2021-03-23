import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "Date_doc", label: "Date Document", align: "left", minWidth: 120 },
  { id: "Date_seq", label: "Date séquence", align: "left", minWidth: 120 },
  { id: "Ref_MO", label: "Référecnce MO", align: "left", minWidth: 220 },
  { id: "Titre", label: "Objet du document", align: "left", minWidth: 200 },
  { id: "Codification", label: "Codification", align: "left", minWidth: 300 },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: "0px",
    margin: "auto",
  },
  container: {
    maxHeight: 300,
    Width: "100%",
  },
});

export default function StickyHeadTable({ data }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const colums = data[0] && Object.keys(data[0]);
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader size='small' aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    {colums.map((colum) => (
                      <TableCell
                        key={colum.id}
                        align={colum.align}
                        style={
                          { minWidth: colum.minWidth ,
                            mawWidth :colum.minWidth    
                                }}
                       
                      >
                        {row[colum]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
