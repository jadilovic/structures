import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
// import { useDemoData } from "@material-ui/x-grid-data-generator";
import { individualStructure } from "../actions/creator";
import IndividualStru from "../components/IndividualStru";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function BasicFilteringGrid(props) {
  const dataArray = props.props;
  const history = useHistory();
  const dispatch = useDispatch();
  const dataHeaders = [
    {
      field: "name",
      headerName: "Name",
      width: 110,
    },
    {
      field: "description",
      headerName: "Description",
      width: 110,
    },
    {
      field: "city",
      headerName: "City",
      width: 110,
    },
    {
      field: "country",
      headerName: "Country",
      width: 110,
    },
    {
      field: "timezone",
      headerName: "Timezone",
      width: 110,
    },
    {
      field: "isActive",
      headerName: "Active",
      width: 110,
    },
  ];

  const structures = { columns: dataHeaders, rows: dataArray };
  console.log(structures);

  /*
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 6,
  });
  console.log(data);
*/

  function displayStructure(data) {
    console.log("what");
    dispatch(individualStructure(data));
    history.push("/individualStr", data);
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        {...structures}
        onRowClick={(props) => {
          console.log(props.row);
          displayStructure(props.row);
        }}
        filterModel={{
          items: [
            {
              columnField: "description",
              operatorValue: "contains",
              value: "",
            },
          ],
        }}
      />
    </div>
  );
}

/*
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function BasicTable(props) {
  const data = props.props;
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="left">Description</StyledTableCell>
            <StyledTableCell align="left">City</StyledTableCell>
            <StyledTableCell align="left">Country</StyledTableCell>
            <StyledTableCell align="left">Timezone</StyledTableCell>
            <StyledTableCell align="left">Active</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => {
            return (
              <StyledTableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="left">{row.city}</TableCell>
                <TableCell align="left">{row.country}</TableCell>
                <TableCell align="left">{row.timezone}</TableCell>
                <TableCell align="left">
                  {row.isActive ? "YES" : "NO"}
                </TableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
*/
