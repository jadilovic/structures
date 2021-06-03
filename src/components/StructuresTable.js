import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import { displayStructure, clearData } from "../actions/creator";
import useStructures from "../hooks/useStructures";

const useStyles = makeStyles((theme) => ({
  row: {
    cursor: "pointer",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function StructuresTable() {
  useStructures();
  const dispatch = useDispatch();
  const classes = useStyles();
  const userScreenHeight = window.innerHeight;

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
        <Typography>Loading...</Typography>
        <CircularProgress />
      </Grid>
    );
  }
  if (error) {
    return "Error!";
  }
  return (
    <Container maxWidth="lg">
      <div
        style={{
          height: userScreenHeight - 112,
          width: "100%",
          cursor: "pointer",
        }}
      >
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
    </Container>
  );
}
