import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { clearData, displayMachine } from "../actions/creator";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import useMachines from "../actions/useMachines";

export default function BasicFilteringGrid() {
  useMachines();
  const dispatch = useDispatch();

  // CLEAR DATA IN STORE BEFORE LOADING NEW DATA FROM API
  useEffect(() => {
    dispatch(clearData());
  }, []);

  const dataArray = useSelector((state) => state.machines);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  console.log(loading);

  const history = useHistory();

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
      field: "alias",
      headerName: "Alias",
      flex: 1,
    },
    {
      field: "manufacturer",
      headerName: "Manufacturer",
      flex: 1,
    },
    {
      field: "placeNumber",
      headerName: "Place Number",
      flex: 1,
    },
    {
      field: "businessId",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "timezone",
      headerName: "Timezone",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Machine Type",
      flex: 1,
    },
    {
      field: "structure",
      headerName: "Structure",
      flex: 1,
    },
    {
      field: "isActive",
      headerName: "Active",
      valueFormatter: (params) => (params.value ? "Yes" : "No"),
      flex: 1,
    },
  ];

  const machines = { columns: dataHeaders, rows: dataArray };

  function displayMachineRow(data) {
    dispatch(displayMachine(data));
    history.push("/individual-machine");
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
                {...machines}
                onRowClick={(props) => {
                  displayMachineRow(props.row);
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
