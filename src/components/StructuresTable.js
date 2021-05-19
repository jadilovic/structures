import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { displayStructure } from "../actions/creator";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import useStructures from "../actions/useStructures";

export default function BasicFilteringGrid() {
  useStructures();
  const dataArray = useSelector((state) => state.structures);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  console.log(dataArray);
  const history = useHistory();
  const dispatch = useDispatch();

  const dataHeaders = [
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

  const structures = { columns: dataHeaders, rows: dataArray };
  console.log(structures);

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
        <div style={{ marginTop: "12vh", height: 400, width: "100%" }}>
          <div style={{ display: "flex", height: "100%" }}>
            <div style={{ flexGrow: 1, cursor: "pointer" }}>
              <DataGrid
                {...structures}
                onRowClick={(props) => {
                  console.log(props.row);
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
