import React, { useState } from 'react';
import axios from 'axios';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Grid,
  Button,
  Snackbar,
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
import _ from 'lodash';
import authHeader from '../service/auth-header';
import { CustomNoMachinesInSensorOverlay } from './NoRowsOverlay';
import { setAuthorized, clearData, displayMachine } from '../actions/creator';
import ConfirmDialog from './ConfirmDialog';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

// UNDER CONSTRUCTION
export default function IndividualSensorDisplay() {
  let sensor = useSelector((state) => state.main.individualSensor);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [openDeleteNotification, setOpenDeleteNotification] = useState(false);

  const displayDeleteNotification = () => {
    setOpenDeleteNotification(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenDeleteNotification(false);
    history.push('/sensors-table');
  };

  if (_.isEmpty(sensor)) {
    const sensorData = localStorage.getItem('sensor-data');
    sensor = JSON.parse(sensorData);
    dispatch(setAuthorized(true));
  } else {
    localStorage.setItem('sensor-data', JSON.stringify(sensor));
  }

  function deleteIndividualSensor(sensorId) {
    dispatch(clearData());
    // dispatch(deleteSensor(sensorId));
    displayDeleteNotification();
  }

  const displaySensorMachine = async (machine) => {
    dispatch(clearData());
    const response = await axios
      .get(`/api/machines/${machine.id}?populate=sensors`, {
        headers: authHeader(),
      })
      .catch((error) => {
        console.log(error);
      });
    if (response) {
      dispatch(displayMachine(response.data));
      history.push('/individual-machine');
    }
  };

  const machinesColumns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
    },
    {
      field: 'alias',
      headerName: 'Alias',
      flex: 1,
    },
    {
      field: 'type',
      headerName: 'Machine Type',
      valueGetter: (params) => params.row.type.name,
      flex: 1,
    },
  ];

  const userScreenHeight = window.innerHeight;

  const machinesDataGrid = {
    columns: machinesColumns,
    rows: [sensor.machine],
  };

  return (
    <Grid container spacing={3}>
      {openDeleteNotification && (
        <div className={classes.root}>
          <Snackbar
            open={openDeleteNotification}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              You have successfuly deleted selected sensor! You will now be
              returned to the Sensors page.
            </Alert>
          </Snackbar>
        </div>
      )}
      <Grid item xs={6}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Sensor ID:
                </TableCell>
                <TableCell>{sensor.sensorId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Active:
                </TableCell>
                <TableCell>{`${sensor.isActive ? 'Yes' : 'No'}`}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Alias:
                </TableCell>
                <TableCell>{sensor.alias}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Sensor Type:
                </TableCell>
                <TableCell>{sensor.type.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Machine:
                </TableCell>
                <TableCell>{sensor.machine.name}</TableCell>
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
            Delete Sensor
          </Button>
          <ConfirmDialog
            title="Delete Sensor?"
            open={confirmOpen}
            setOpen={setConfirmOpen}
            onConfirm={() => deleteIndividualSensor(sensor.id)}
          >
            Are you sure you want to delete this sensor?
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
                NoRowsOverlay: CustomNoMachinesInSensorOverlay,
              }}
              size="small"
              aria-label="a dense table"
              {...machinesDataGrid}
              onRowClick={(props) => {
                displaySensorMachine(props.row);
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
