import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid, Container, Typography } from "@material-ui/core";
import { clearData, displayMachine } from "../actions/creator";
import useMachines from "../hooks/useMachines";

export default function MachinesTable() {
  useMachines();
  const dispatch = useDispatch();

  const userScreenHeight = window.innerHeight;

  // CLEAR DATA IN STORE BEFORE LOADING NEW DATA FROM API
  useEffect(() => {
    dispatch(clearData());
  }, []);

  const machinesData = useSelector((state) => state.machines);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const history = useHistory();

  const machinesColumns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "businessId",
      headerName: "Business ID",
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
      valueFormatter: (params) => params.row.type.name,
      flex: 1,
    },
    {
      field: "structure",
      headerName: "Structure",
      valueFormatter: (params) => params.row.name,
      flex: 1,
    },
    {
      field: "isActive",
      headerName: "Active",
      valueFormatter: (params) => (params.value ? "Yes" : "No"),
      flex: 1,
    },
  ];

  const machines = { columns: machinesColumns, rows: machinesData };

  function displayMachineRow(data) {
    dispatch(clearData());
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
          size="small"
          aria-label="a dense table"
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
    </Container>
  );
}
