import React, { useState } from 'react';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Button,
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import axios from 'axios';
import { CustomSensorsRowsOverlay } from './NoRowsOverlay';

import authHeader from '../service/auth-header';
import {
  setAuthorized,
  displaySensor,
  deleteMachine,
  clearData,
} from '../actions/creator';
import ConfirmDialog from './ConfirmDialog';
import { setSnackbar } from '../reducers/snackbarReducer';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3),
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  row: {
    cursor: 'pointer',
  },
}));

export default function IndividualMachineDisplay() {
  let machine = useSelector((state) => state.main.individualMachine);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (_.isEmpty(machine)) {
    const machineData = localStorage.getItem('machine-data');
    machine = JSON.parse(machineData);
    dispatch(setAuthorized(true));
  } else {
    localStorage.setItem('machine-data', JSON.stringify(machine));
  }

  // SNACK BAR DELETE NOTIFICATION
  const displayDeleteNotification = () => {
    dispatch(
      setSnackbar(
        true,
        'success',
        'Selected machine has been successfully deleted!'
      )
    );
    history.push('/machines-table');
  };

  function deleteIndividualMachine(machineId) {
    dispatch(clearData());
    dispatch(deleteMachine(machineId));
    displayDeleteNotification();
  }

  const displaySensorRow = async (sensorId) => {
    dispatch(clearData());
    const response = await axios
      .get(`/api/sensors/${sensorId}?populate=machine`, {
        headers: authHeader(),
      })
      .catch((error) => {
        console.log(error);
      });
    if (response) {
      dispatch(displaySensor(response.data));
      history.push('/individual-sensor');
    }
  };

  const sensorColumns = [
    {
      field: 'sensorId',
      headerName: 'Sensor ID',
      flex: 1,
    },
    {
      field: 'isActive',
      headerName: 'Active',
      valueFormatter: (params) => (params.value ? 'Yes' : 'No'),
      flex: 1,
    },
    {
      field: 'alias',
      headerName: 'Alias',
      flex: 1,
    },
    {
      field: 'type',
      headerName: 'Type',
      valueGetter: (params) =>
        params.row.type ? params.row.type.name : 'No Type',
      flex: 1,
    },
  ];

  const userScreenHeight = window.innerHeight;

  const sensorsDataGrid = {
    columns: sensorColumns,
    rows: machine.sensors,
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Machine Name:
                </TableCell>
                <TableCell>{machine.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Active:
                </TableCell>
                <TableCell>{`${machine.isActive ? 'Yes' : 'No'}`}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Business ID:
                </TableCell>
                <TableCell>{machine.businessId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Description:
                </TableCell>
                <TableCell>{machine.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Alias:
                </TableCell>
                <TableCell>{machine.alias}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Place Number:
                </TableCell>
                <TableCell>{machine.placeNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Manufacturer:
                </TableCell>
                <TableCell>{machine.manufacturer}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Timezone:
                </TableCell>
                <TableCell>{machine.timezone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Type:
                </TableCell>
                <TableCell>{machine.type.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Structure:
                </TableCell>
                <TableCell>{machine.structure}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <Button
            aria-label="delete"
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={() => setConfirmOpen(true)}
          >
            Delete Machine
          </Button>
          <ConfirmDialog
            title="Delete Machine?"
            open={confirmOpen}
            setOpen={setConfirmOpen}
            onConfirm={() => deleteIndividualMachine(machine.id)}
          >
            Are you sure you want to delete this machine?
          </ConfirmDialog>
        </div>
      </Grid>
      <Grid item xs={6}>
        <TableContainer component={Paper}>
          <div
            style={{
              height: userScreenHeight - 112,
              width: '100%',
              cursor: 'pointer',
            }}
          >
            <DataGrid
              components={{
                NoRowsOverlay: CustomSensorsRowsOverlay,
              }}
              size="small"
              aria-label="a dense table"
              {...sensorsDataGrid}
              onRowClick={(props) => {
                displaySensorRow(props.row.id);
              }}
              filterModel={{
                items: [
                  {
                    columnField: 'description',
                    operatorValue: 'contains',
                    value: '',
                  },
                ],
              }}
              localeText
            />
          </div>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
