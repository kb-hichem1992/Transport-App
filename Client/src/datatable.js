import React from "react";
import './datatable.css';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });

export default function Datatable ({data}){
    
   
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
        // <div className='container'>
        //       <table className ="customersfl-table" >
        // <thead>
        //     <tr>{data[0] && colums.map((heading)=> <th>{heading}</th>)}</tr>
        // </thead>
        // <tbody>
        //     {data.map(row => <tr> 
        //     {
        //         colums.map(colum => <td>{row[colum]}</td>)
        //     }
        //     </tr>)
        //     }
        // </tbody>
        //  </table>
        // </div>
   <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          {data[0] && colums.map((heading)=> <TableCell>{heading}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
            {data.map(row => 
            <TableRow> 
             {
                 colums.map(colum => <TableCell align ='left'>{row[colum]}</TableCell>)
             }
             </TableRow>)
             }
        </TableBody>
      </Table>
    </TableContainer>
     
    );
  
}