import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { displayStructure, clearData } from "../actions/creator";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box, Grid } from "@material-ui/core";
import useStructures from "../hooks/useStructures";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  row: {
    cursor: "pointer",
  },
}));

export default function StructuresTable() {
  useStructures();
  const dispatch = useDispatch();
  const classes = useStyles();

  // CLEAR DATA IN STORE BEFORE LOADING NEW DATA FROM API
  useEffect(() => {
    console.log("CLeAR DATA");
    dispatch(clearData());
  }, []);

  const structuresData = useSelector((state) => state.structures);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const history = useHistory();

  const dataColumns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
    },
    {
      field: "timezone",
      headerName: "Timezone",
      flex: 1,
    },
    {
      field: "isActive",
      headerName: "Active",
      valueFormatter: (params) => (params.value ? "Yes" : "No"),
      flex: 1,
    },
  ];

  const structures = { columns: dataColumns, rows: structuresData };

  function displayStructureRow(data) {
    dispatch(displayStructure(data));
    history.push("/individual-structure");
  }

  if (loading) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <Box>
            <h2>Loading...</h2>
            <CircularProgress />
          </Box>
        </Grid>
      </Grid>
    );
  } else if (error) {
    return "Error!";
  } else {
    return (
      <>
        <div style={{ height: 550, width: "100%" }}>
          <div style={{ display: "flex", height: "100%" }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                {...structures}
                className={classes.row}
                onRowClick={(props) => {
                  displayStructureRow(props.row);
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
          </div>
        </div>
      </>
    );
  }
}
