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
  Snackbar,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
import _ from 'lodash';
import { setAuthorized, clearData, displayMachine } from '../actions/creator';
import ConfirmDialog from './ConfirmDialog';
import useMachines from '../hooks/useMachines';

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
  useMachines();
  let sensor = useSelector((state) => state.main.individualSensor);
  const machines = useSelector((state) => state.main.machines);
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

  function displaySensorMachine(machineId) {
    const machineArray = machines.filter((machine) => machine.id === machineId);
    const machineData = machineArray.pop();
    dispatch(displayMachine(machineData));
    history.push('/individual-machine');
  }

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
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography>Machine</Typography>
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            {sensor.machine ? (
              <TableBody>
                <TableRow>
                  <TableCell>Name:</TableCell>
                  <TableCell>Type:</TableCell>
                </TableRow>
                <TableRow
                  variant="contained"
                  color="primary"
                  align="center"
                  className={classes.row}
                  onClick={() => {
                    displaySensorMachine(sensor.machine);
                  }}
                >
                  <TableCell>{sensor.machine.name}</TableCell>
                  <TableCell>{sensor.machine.type.name}</TableCell>
                </TableRow>
              </TableBody>
            ) : (
              'No Machine for this sensor'
            )}
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
